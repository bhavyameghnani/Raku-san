from flask import Flask, jsonify, request, send_file
from flask_cors import CORS, cross_origin
import json
import os
import openai
import base64
from datetime import datetime
from pymongo import MongoClient
import urllib
from bson.json_util import dumps
# import config
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings, HuggingFaceInstructEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
import openai

app = Flask(__name__)
CORS(app, support_credentials=True)
api_key="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"
openai.api_key=api_key
os.environ["OPENAI_API_KEY"] = api_key


@app.route('/')
@cross_origin(support_credentials=True)
def hello():
    return "Welcome to Raku-San APP by Team SPARK"


def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks


def get_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore


def get_conversation_chain(vectorstore):
    llm = ChatOpenAI(temperature=0.2, model_name='gpt-3.5-turbo')
    memory = ConversationBufferMemory(
        memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory
    )
    return conversation_chain


@app.route('/generateIdeaDetails', methods=['GET'])
@cross_origin(support_credentials=True)
def generateIdeaDetails():
    
    test_data=[
  {
    "title": "Device Compatibility Query",
    "query": "I'm thinking of getting a new smartphone. How can I check if it's compatible with Rakuten Mobile's network?",
    "url": "https://esimgohub.com/wp-content/uploads/2023/02/gif3.gif"
  },
  {
    "title": "Roaming Assistance",
    "query": "I'm traveling abroad soon. How can I make sure I can use my phone while I'm there?",
    "url": "https://media3.giphy.com/media/dNVoT4sykcJi72bfhW/200w.gif?cid=790b7611003nkf2bsg5xw7jlhjpncp6gi0axxnsxjq1kewxh&ep=v1_gifs_search&rid=200w.gif&ct=g"
  },
  {
    "title": "Billing Inquiry",
    "query": "I received my bill, and there's a charge I don't understand. Can you explain it to me?",
    "url": "https://media1.giphy.com/media/tlVIoU940wRDkMUqrp/200w_d.gif"
  },
  {
    "title": "Voicemail Setup",
    "query": "I've never set up my voicemail. Can you guide me on how to do that?",
    "url": "https://images.squarespace-cdn.com/content/v1/5c253c6eb10598834858f4f8/1609730443692-9V0Q8LIAYC33VAW9O1FX/ezgif.com-gif-maker+%283%29.gif"
  },
  {
    "title": "Network Outage Query",
    "query": "My mobile data isn't working, and I can't make calls. Is there a network outage in my area?",
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSecREYJQW0PPY8UdMiUV9DYt9pYMt5Vxua0g&usqp=CAU"
  }
]

    ideaDetails = request.args.get("prompt")
    
    text_chunks = get_text_chunks(ideaDetails)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Act as a tech specialist your task is to provide consolidated resolutions for the user query. The response should not be more than 100-200 words. Also please response by keeping entire converstaion into consideration. Please note the user is 30 year and not much tech savy."})
    prompt_answer=result['answer']
    
    json_prompt="""I will be providing you the customer query and array of json data which contains three fields title,query and url. Your task is to analyse customer query and give me the url which best suits based on the title and query. Provide only the one url. For example answer should be in this format Url : https://abc.com 
        Customer Query : {0}
        Json Data : {1}
    """.format(ideaDetails,test_data)
    url=get_chatgpt_response(json_prompt)
    return {'answer':prompt_answer,'url':str(url).split(": ")[1]}
    

def get_chatgpt_response(prompt):

    try:
        model_engine = "text-davinci-003"
    # Generate a response
        completion = openai.Completion.create(
            engine=model_engine,
            prompt=prompt,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0,
        )

        response = completion.choices[0].text
        
        return response
    except Exception as e:
        print(e)
        print("Inside Exception")
        return str(e)
    # print(response)
    
    


@app.route('/generateProblemStatement', methods=['POST'])
@cross_origin(support_credentials=True)
def generateProblemStatement():
    elaboratedIdeaDetails = request.data.decode("utf-8")
    text_chunks = get_text_chunks(elaboratedIdeaDetails)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Act as an Research Analyst. Your task is to generate the problem statement for the idea. Please highlight the key problem faced by the industry and challenges in 7 to 8 lines"})
    print(result['answer'])
    return {'status': 'success', 'data': result['answer']}
    # return "Well recieved"


@app.route('/generateProposedSolution', methods=['POST'])
@cross_origin(support_credentials=True)
def generateProposedSolution():
    ideaProblemDetails = request.data.decode("utf-8")
    text_chunks = get_text_chunks(ideaProblemDetails)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Act as an Product Associate. Your task is to generate a proposed solution summary from the problem statement and idea shared. Please highlight & summarize the key solutions in 7 to 8 lines"})
    print(result['answer'])
    return {'status': 'success', 'data': result['answer']}
    # return "Well recieved"


@app.route('/generateInnovationModules', methods=['POST'])
@cross_origin(support_credentials=True)
def generateInnovationModules():
    ideaProblemSolutionDetails = request.data.decode("utf-8")
    text_chunks = get_text_chunks(ideaProblemSolutionDetails)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Act as an Business Analyst. Your task is to share a breif summary of how it will help various business stakeholders and how will the idea be able to generate revenue & profits."})
    print(result['answer'])
    return {'status': 'success', 'data': result['answer']}
    # return "Well recieved"


@app.route('/generateMarketResearch', methods=['POST'])
@cross_origin(support_credentials=True)
def generateMarketResearch():
    backgroundData = request.data.decode("utf-8")
    text_chunks = get_text_chunks(backgroundData)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Act as an Market Research Analyst. Your task is to share list of 3 to 4 competitor along with 2 to 3 lines summary of solution they provide. Also, please provide current market trends, emerging tech used in this field and key financial metrics supporting to the background data provided."})
    print(result['answer'])
    return {'status': 'success', 'data': result['answer']}
    # return "Well recieved"


@app.route('/generateKeyProblems', methods=['POST'])
@cross_origin(support_credentials=True)
def generateKeyProblems():
    marketData = request.data.decode("utf-8")
    text_chunks = get_text_chunks(marketData)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Act as an Business Analyst. Your task is to list all the key problems that this solution is trying to solve along with 2-3 lines summary of each key problem identified."})
    print(result['answer'])
    return {'status': 'success', 'data': result['answer']}
    # return "Well recieved"


@app.route('/generateUserStakeholders', methods=['POST'])
@cross_origin(support_credentials=True)
def generateUserStakeholders():
    backgroundMarketData = request.data.decode("utf-8")
    text_chunks = get_text_chunks(backgroundMarketData)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Act as an Business Analyst. Your task is to list all the key stakeholders, benefeciaries and key personas along with 2-3 lines summary for all"})
    print(result['answer'])
    return {'status': 'success', 'data': result['answer']}


if __name__ == "__main__":
    app.run(port=5000, debug=True)


""" Workspace Related API's """
# @app.route('/addWorkspace', methods=['POST'])
# @cross_origin(support_credentials=True)
# def addWorkspace():
#     workspace = request.get_json(silent=True)
#     records = db.workspace
#     response = records.insert_one(workspace)
#     print(response)
#     return response


# username = urllib.parse.quote_plus(config.USERNAME)
# password = urllib.parse.quote_plus(config.PASSWORD)
# cluster = urllib.parse.quote_plus(config.CLUSTER)
# database = urllib.parse.quote_plus(config.DATABASE)

# url = "mongodb+srv://{}:{}@{}/{}?retryWrites=true&w=majority".format(username, password, cluster, database)

# client = MongoClient(url)
# db = client.get_database('fire')