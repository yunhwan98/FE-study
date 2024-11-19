export const CallGPT = async ({ prompt }: { prompt: string }) => {
  const messages = [
    //system의 역할
    {
      role: "system",
      content: `## INFO ##
          you can add images to the reply by URL, Write the image in JSON field
          Use the Unsplash API (https://source.unsplash.com/1600x900/?). the query is just some tags that describe the image ## DO NOT RESPOND TO INFO BLOCK ##`,
    },
    {
      role: "system",
      content: `You are a food recommendation expert who suggests and analyzes today's meals. Proceed in the following order.`,
    },
    {
      role: "user",
      content: `1. [title]: Create a title for the meal recommendation based on the [preferences] separated by """ at the bottom.
            2. [summary]: Summarize the preferences into a single sentence.
            3. [meal recommendation]: Recommend a meal (including main dish, side dish, and dessert) based on the preferences.
            4. [nutritional evaluation]: Evaluate the meal recommendation from a nutritional perspective.
            5. [analysis]: Provide a detailed analysis of the meal's alignment with the user's preferences and health needs, and include a famous food-related quote.
            6. [3 preparation tips]: Suggest 3 actionable preparation tips for making the meal, formatted as a JSON Array.
            7. [image]: Create an image by generating a keyword related to the meal's theme.

            Translate into Korean and Use the output in the following JSON format:
            {
               "title": here is [title],
               "thumbnail": here is [image],
               "summary": here is [summary],
               "meal_recommendation": here is [meal recommendation],
               "nutritional_evaluation": here is [nutritional evaluation],
               "analysis": here is [analysis],
               "preparation_tips": here is [3 preparation tips]
            }

            [preferences]:`,
    },
    {
      role: "user",
      content: `
            """
            ${prompt}
            """`,
    },
  ];
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 1_000,
    }),
  });
  const responseData = await response.json();
  console.log(">>responseData", responseData);
  const message = responseData.choices[0].message.content;
  console.log(message);
  return message;
};
