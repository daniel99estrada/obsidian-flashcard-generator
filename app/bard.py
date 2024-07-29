# -*- coding: utf-8 -*-
"""bard

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1NKqkOIJ2kKoxSI3TnS82jeXRiCc8AEMk
"""

import requests

# Replace with your actual API key
API_KEY = "AIzaSyBfk-JaTBKYVmKzj-MSuXhAhQaY4QPZoHI"

def generate_text(text):
  
  inquiry = "Hi, I would like you to create a series of questions based on a given topic. I will provide a paragraph describing what I know about the subject. Your task is to generate questions that can be used to create flashcards, with the answers drawn from the information provided in the paragraph. The questions should cover key points, concepts, and details mentioned in the paragraph. Additionally, craft more questions on related topics that are not covered in the paragraph and provide the answers. Return your response in this format: Question: Question about the topic. Answer: Answer about the topic. Here is the paragraph:"

  prompt = f"{inquiry} {text}"

  # Construct the request body
  request_body = {
      "contents": [
          {"role": "user", "parts": [{"text": prompt}]}
      ]
  }

  # Build the URL with the API key
  url = f"https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key={API_KEY}"

  # Set headers for content type
  headers = {"Content-Type": "application/json"}

  # Send the POST request
  response = requests.post(url, headers=headers, json=request_body)

  # Print the entire response for debugging
  print(f"API Response: {response.json()}")
  print(f"Status Code: {response.status_code}")

  # Check for successful response
  if response.status_code == 200:
    # Parse the JSON response
    data = response.json()
    # Access the generated text from the response (modify this if the key has changed)
    return data
  else:
    print(f"Error: API call failed with status code {response.status_code}")
    return None

# Define the prompt as a string
inquiry = "Hi, I would like you to create a series of questions based on a given topic. I will provide a paragraph describing what I know about the subject. Your task is to generate questions that can be used to create flashcards, with the answers drawn from the information provided in the paragraph. The questions should cover key points, concepts, and details mentioned in the paragraph. Additionally, craft more questions on related topics that are not covered in the paragraph and provide the answers. Return your response in this format: Question: Question about the topic. Answer: Answer about the topic. Here is the paragraph:"
paragraph = " On September 11 2001 a series of coordinates attacks occurred in New York City. There were carried out by 19 members of the terrorist group [[al-Qaeda]]. Early in the morning, the American airlines flight 11 crashed into the North tower of the [[World Trace Center]]. Around 15 minutes later at 9:03, United Airlines' flight 175 crashed into the south tower of the [[World Trace Center]]. Both buildings collapsed due to the impact and the subsequent fire. Around 30 minutes later, American Airlines flight 77 crashed into the [[Pentagon]] in Arlington Virginia. This attack caused several casualties and damaged the headquarters of The United state's [[Department of Defense]] The attacks led [[George W. Bush ]] to launch a military campaign known as [[The War on Terror]] against [[al-Qaeda]]. In 2011, a special forces operation killed [[Osama bin Laden]] in Pakistan. The [[Transportation Security Agency]] was created to enhance security at airports, and  [[Patriot Act]] was enacted, increasing the state's power to monitor and investigate. "

prompt = f"{inquiry} {paragraph}"
# Generate text using the prompt
api_response = generate_text(prompt)

import json
def parse_questions(api_response):
    text_content = api_response['candidates'][0]['content']['parts'][0]['text']

    # Split the text content into lines
    lines = text_content.split('\n')

    questions_and_answers  = []


    for line in lines:
        line = line.strip()
        line = line.replace("*", "")

        if line.startswith('Question:'):
            question = line.split(': ', 1)[1]
            questions_and_answers.append({"question": question})

        elif line.startswith('Answer:'):
            answer = line.split(': ', 1)[1]
            questions_and_answers[-1]["answer"] = answer

    return questions_and_answers

flashcards_json = parse_questions(api_response)

def generate_flashcards(text):
   api_response = generate_text(prompt)
   flashcards = parse_questions(api_response)
   return flashcards
   
   


