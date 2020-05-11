import api from "./api";

const workflowsMapping = "/workflows";

export default {
  getWorkflows: () => api.get(workflowsMapping),
  addWorkflow: workflowDto => api.put(workflowsMapping, workflowDto),
  getWorkflowTasks: workflowId => api.get(`${workflowsMapping}/${workflowId}/tasks`),
  getWorkflowTasksStatusInfo: workflowId => api.get(`${workflowsMapping}/${workflowId}/tasks/status`),
  getWorkflowGraph: workflowId => api.get(`${workflowsMapping}/${workflowId}/graph`),
  getWorkflowGanttChart: (workflowId, date) => api.get(`${workflowsMapping}/${workflowId}/gantt`, {
    params: {
      date: date
    }
  }),
  getWorkflowTasksDuration: (workflowId, taskDurationFilter) =>
    api.post(`${workflowsMapping}/${workflowId}/duration`, taskDurationFilter)
}