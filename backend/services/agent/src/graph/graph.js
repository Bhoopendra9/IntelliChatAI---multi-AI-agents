import { StateGraph } from "@langchain/langgraph";

import { agentState } from "./state.js";

import {router} from "../graph/router.js";
import {chatAgent} from "../agents/chat.agent.js";
import {codingAgent} from "../agents/coding.agent.js";
import {imageGenAgent} from "../agents/imageGen.agent.js";
import {pdfAgent} from "../agents/pdf.agent.js";
import {pptAgent} from "../agents/ppt.agent.js";
import {searchAgent} from "../agents/search.agent.js";

const workflowGraph = new StateGraph(agentState);


// Add nodes 
workflowGraph.addNode("router", router);
workflowGraph.addNode("chat", chatAgent);
workflowGraph.addNode("coding", codingAgent);
workflowGraph.addNode("vision", imageGenAgent);
workflowGraph.addNode("pdf", pdfAgent);
workflowGraph.addNode("ppt", pptAgent);
workflowGraph.addNode("search", searchAgent);

// Add edges to node define the workflow
workflowGraph.addEdge("__start__", "router");
workflowGraph.addConditionalEdges(
  "router",
  (state) => {
    switch (state.agent) {
      case "chat":
        return "chat";
      case "coding":
        return "coding";
      case "vision":
        return "vision";
      case "pdf":
        return "pdf";
      case "ppt":
        return "ppt";
      case "search":
        return "search";
      default:
        return "chat";
    }
  },
  {
    //it is basically a mapping of the agent names to their corresponding node names in the graph
    chat: "chat",
    coding: "coding",
    vision: "vision",
    pdf: "pdf",
    ppt: "ppt",
    search: "search",
  },
);
workflowGraph.addEdge("search", "chat"); // After search, go to chat for further interaction
workflowGraph.addEdge("chat", "__end__"); // After chat, end the workflow
workflowGraph.addEdge("coding", "__end__"); // After coding, end the workflow
workflowGraph.addEdge("vision", "__end__"); // After vision, end the workflow
workflowGraph.addEdge("pdf", "__end__"); // After pdf, end the workflow
workflowGraph.addEdge("ppt", "__end__"); // After ppt, end the workflow

// Compile the graph
const graph = workflowGraph.compile();

export default graph;
