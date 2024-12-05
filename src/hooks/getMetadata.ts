import { TApiResponse, TMetadata, TMetadataRequestBody } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import OpenAI from "openai";

export const fetchMetadata = async (
  reqbody: TMetadataRequestBody
): Promise<TMetadata | null> => {
  try {
    const openai = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a dispatch AI assistant. 
              Given the following text, extract information like caller name, callback information, address of the incident, nature of emergency, dispatch priority, case type, & situation details. 
              Your response should align with the JSON format using the following tags, "caller_name", "callback_information", "incident_location", "dispatch", "priority", "case_type", "latitude", "longitude", and "situation_details". 
              "priority" can only be "low", "medium", or "high", "dispatch" can be "police", "fire", "medical", "trafficControl", "hazmat", "searchRescue", or "noResponse", and "case_type" can only be "Fire", "Medical", "Police", "Traffic", "Rescue", "Utility", "PublicDisturbance", "Violence", "AnimalControl", or "Other". 
              Pay careful attention to what could be the caller name.
              ALWAYS generate an estimated latitude and longitude.            
              If you do not have enough information to conclude a field, leave an empty string.
              Try to give atleast one "dispatch" recommendation.
              DO NOT UNDER ANY CIRCUMSTANCES HAVE PHRASES OR PSEUDONYMS AS RESPONSES FOR "caller_name".
              DO NOT UNDER ANY CIRCUMSTANCES RETURN A GENERAL DESCRIPTION FOR "incident_location" RETURN A DETAILED LOCATION DESCRIPTION.
              Finally, YOU MUST FORMAT YOUR RESPONSE AS A JSON OBJECT ALWAYS`,
        },
        {
          role: "user",
          content: reqbody.text,
        },
      ],
    });

    console.log(completion.choices[0].message.content);
    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    return { error: error.message };
  }
};

export default function useMetadata({
  callback,
}: {
  callback: (data: TMetadata | null) => void;
}) {
  return useMutation({
    mutationFn: fetchMetadata,
    onSuccess: (data) => {
      callback(data);
    },
  });
}
