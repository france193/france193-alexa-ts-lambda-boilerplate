import {
  ErrorHandler,
  RequestHandler,
  SkillBuilders,
  getRequestType,
  getIntentName,
  HandlerInput,
} from "ask-sdk-core";

const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean | Promise<boolean> {
    return getRequestType(handlerInput.requestEnvelope) === "LaunchRequest";
  },
  handle(handlerInput: HandlerInput) {
    const speakOutput = "Ciao bello, come stai? Salutami o chiedi aiuto.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const HelloWorldIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean | Promise<boolean> {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      getIntentName(handlerInput.requestEnvelope) === "HelloWorldIntent"
    );
  },
  handle(handlerInput: HandlerInput) {
    const speakOutput = "Ciao Bello!";
    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

const HelpIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean | Promise<boolean> {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput: HandlerInput) {
    const speakOutput = "Prova a dirmi ciao! Come posso aiutarti?";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const CancelAndStopIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean | Promise<boolean> {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (getIntentName(handlerInput.requestEnvelope) === "AMAZON.CancelIntent" ||
        getIntentName(handlerInput.requestEnvelope) === "AMAZON.StopIntent")
    );
  },
  handle(handlerInput: HandlerInput) {
    const speakOutput = "Alla prossima!";
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};

const SessionEndedRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean | Promise<boolean> {
    return (
      getRequestType(handlerInput.requestEnvelope) === "SessionEndedRequest"
    );
  },
  handle(handlerInput: HandlerInput) {
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse();
  },
};

const IntentReflectorHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean | Promise<boolean> {
    return getRequestType(handlerInput.requestEnvelope) === "IntentRequest";
  },
  handle(handlerInput: HandlerInput) {
    const intentName = getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

const ErrorHandler: ErrorHandler = {
  canHandle(): boolean | Promise<boolean> {
    return true;
  },
  handle(handlerInput: HandlerInput, error) {
    console.log(`~~~~ Error handled: ${error.stack}`);
    const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

export const handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
