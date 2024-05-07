import PropTypes from "prop-types";
import WeatherData from "./WeatherData";

const WeatherDescript = (prompt) => {
  const url = "https://api.openai.com/v1/chat/completions";

  const sysMsg = "In a conversational professional tone...";
  const newPrompt = `Question: ${prompt}. Weather Data: ${JSON.stringify(
    WeatherData
  )}`;
  const data = {
    model: "gpt-4-turbo-0613",
    messages: [
      { role: "system", content: sysMsg },
      { role: "user", content: prompt },
    ],
  };

  const params = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  };

  return fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("Error:", error);
      return Promise.reject(
        "Unable to identify a location from your question. Please try again."
      );
    });
};

WeatherDescript.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default WeatherDescript;
