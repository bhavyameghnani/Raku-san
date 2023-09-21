from flask import Flask, jsonify, request, send_file
from flask_cors import CORS, cross_origin
import json
import os
import openai

from Utils.LLMUtils import blog_generator, campaign_generator, email_generator, get_chat_model_completions, getFirstAdvertisement
from Utils.Utils import extract_dictionary_from_string, formatParagraphs

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

    "title": "Network Outage Query",

    "query": "My mobile data isn't working, and I can't make calls. Is there a network outage in my area?",

    "url": "https://media.tenor.com/Yv2zYyb_T24AAAAM/flutter-network-check-check-network-connection-flutter.gif"

  },

  {

    "title": "Roaming Assistance",

    "query": "I'm traveling abroad soon. How can I make sure I can use my phone while I'm there?",

    "url": "https://i.gifer.com/origin/bc/bc2f0836f814b6e491768a5629450dc1_w200.gif"

  },

  {

    "title": "Billing Inquiry",

    "query": "I received my bill, and there's a charge I don't understand. Can you explain it to me?",

    "url": "https://help.commonsku.com/hubfs/9Qiba7gs5u-gif.gif"

  },

  {

    "title": "Voicemail Setup",

    "query": "I've never set up my voicemail. Can you guide me on how to do that?",

    "url": "https://images.squarespace-cdn.com/content/v1/5c253c6eb10598834858f4f8/1609730443692-9V0Q8LIAYC33VAW9O1FX/ezgif.com-gif-maker+%283%29.gif"

  },

  {

    "title":"Call forwarding",

    "query":"I need to set up call forwarding to another number. How can I do that?",

    "url": "https://www.ringcentral.com/us/en/blog/wp-content/uploads/2022/06/Forward-calls-mobile-GIF.gif"

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
    



@app.route('/generateIdeaDetailsOnboard', methods=['GET'])
@cross_origin(support_credentials=True)
def generateIdeaDetailsOnboard():
    
    

    ideaDetails = request.args.get("prompt")
    
    text_chunks = get_text_chunks(ideaDetails)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    json_prompt="Act as a lead tech support guy which is responsible to answer user query on why private information is required for rakhuten mobile app. Customer Query is : {0}".format(ideaDetails)
    prompt_answer=get_chatgpt_response1(json_prompt)
    return {'answer':prompt_answer}
    

def get_chatgpt_response1(message):
    try:
        print("Inside GPT 3.5 turbo")
        
        # openai.api_key = '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'

        
        chat = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",max_tokens=1024, temperature=0,messages=[{"role": "system", "content": "You are a experience support leads who works in Rakuten Mobile customer support"},
                                             {
                                                 "role": "user", "content": message
                                             },]
        )
        reply = chat.choices[0].message.content
        return reply
    except Exception as e:
        print(e)
        print("Inside Exception")
        return str(e)


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


@app.route('/generateFirstCampaign', methods=["POST"])
def generateFirstCampaign():
    file_name=''
    
    sme_name=request.form['sme_name']
    sme_business=request.form['sme_business']
    sme_location=request.form['sme_location']
    sme_USP=request.form['sme_USP']

    for file in  request.files.getlist('file'):
        file.save(file.filename)
        file_name=file.filename

    text_all=''

    if(len(file_name)>0):

        df = pd.read_csv(file_name)

        for index, row in df.iterrows():
            text_all=text_all+"\n\n"+str(row['ProductID'])+ " "+str(row['ProductName'])+ " "+str('ProductType')+" "+str(row['Price'])+ " "+str(row['Calories'])+" "+" "+str(row['Availability'])+ " "+" "+str(row['SpecialNotes'])
        
        print(len(text_all))

        conversation = getFirstAdvertisement(sme_name, sme_business, sme_location, sme_USP, text_all) 

    else:
        conversation = getFirstAdvertisement(sme_name, sme_business, sme_location, sme_USP) 

    response = extract_dictionary_from_string(get_chat_model_completions(conversation))

    print(response)
    
    return {'status':'success','data': response}


@app.route('/runCampaign', methods=["POST"])
def runCampaign():
    file_name=''
    
    mode=int(request.form["mode"])
    sme_name=request.form['sme_name']
    sme_business=request.form['sme_business']
    sme_location=request.form['sme_location']
    sme_USP=request.form['sme_USP']

    for file in  request.files.getlist('file'):
        file.save(file.filename)
        file_name=file.filename

    text_all=''

    if(len(file_name)>0):

        df = pd.read_csv(file_name)

        for index, row in df.iterrows():
            text_all=text_all+"\n\n"+str(row['ProductID'])+ " "+str(row['ProductName'])+ " "+str('ProductType')+" "+str(row['Price'])+ " "+str(row['Calories'])+" "+" "+str(row['Availability'])+ " "+" "+str(row['SpecialNotes'])
        
        print(len(text_all))

        conversation = campaign_generator(mode, sme_name, sme_business, sme_location, sme_USP, text_all) 

    else:
        conversation = campaign_generator(mode, sme_name, sme_business, sme_location, sme_USP) 

    response = extract_dictionary_from_string(get_chat_model_completions(conversation))
    
    return {'status':'success','data': response}



@app.route('/createBlog', methods=["POST"])
def createBlog():
    file_name=''
    
    sme_name=request.form['sme_name']
    sme_business=request.form['sme_business']
    sme_location=request.form['sme_location']
    sme_USP=request.form['sme_USP']

    for file in  request.files.getlist('file'):
        file.save(file.filename)
        file_name=file.filename

    text_all=''

    if(len(file_name)>0):

        df = pd.read_csv(file_name)

        for index, row in df.iterrows():
            text_all=text_all+"\n\n"+str(row['ProductID'])+ " "+str(row['ProductName'])+ " "+str('ProductType')+" "+str(row['Price'])+ " "+str(row['Calories'])+" "+" "+str(row['Availability'])+ " "+" "+str(row['SpecialNotes'])
        
        print(len(text_all))

        conversation = blog_generator(sme_name, sme_business, sme_location, sme_USP, text_all) 

    else:
        conversation = blog_generator(sme_name, sme_business, sme_location, sme_USP) 

    # response = extract_dictionary_from_string(get_chat_model_completions(conversation))

    response = formatParagraphs(get_chat_model_completions(conversation))

    print(response)
    
    return {'status':'success','data': response}


@app.route('/generatePersonalizedEmail', methods=["POST"])
def generatePersonalizedEmail():
    
    sme_name=request.form['sme_name']
    sme_business=request.form['sme_business']
    sme_location=request.form['sme_location']
    sme_USP=request.form['sme_USP']

    cust_name=request.form['cust_name']
    cust_last_visit=request.form['cust_last_visit']
    cust_past_purchase=request.form['cust_past_purchase']
    cust_dob=request.form['cust_dob']
    cust_preferences=request.form['cust_preferences']
    cust_email=request.form['cust_email']
    cust_freq_of_visits=request.form['cust_freq_of_visits']
    cust_preferred_time=request.form['cust_preferred_time']

    conversation = email_generator(sme_name, sme_business, sme_location, sme_USP, cust_name, cust_last_visit, cust_past_purchase, cust_dob, cust_preferences, cust_email, cust_freq_of_visits, cust_preferred_time) 

    # response = extract_dictionary_from_string(get_chat_model_completions(conversation))

    # response = formatParagraphs(get_chat_model_completions(conversation))

    response = get_chat_model_completions(conversation)
    response=response.replace("\\","")
    print(response)
    json_data=[]
    # json_data.append(response)
    response=json.loads(response,strict=False)
    json_data.append(response)
    
    # print(response['Subject'])
    
    return {'status':'success','data': json_data}

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