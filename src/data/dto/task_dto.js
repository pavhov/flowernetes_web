export class TaskDto {
  constructor(
    name,
    workflow,
    conditions,
    scheduled,
    baseImage,
    memoryRequest,
    memoryLimit,
    cpuRequest,
    cpuLimit,
    sourceScriptId
  ) {
    this.name = name;
    this.workflow = workflow;
    this.conditions = conditions;
    this.scheduled = scheduled;
    this.baseImage = baseImage;
    this.memoryRequest = memoryRequest;
    this.memoryLimit = memoryLimit;
    this.cpuRequest = cpuRequest;
    this.cpuLimit = cpuLimit;
    this.sourceScriptId = sourceScriptId;
  }
}

export const TaskStatus = {
  WAITING: "WAITING",
  PENDING: "PENDING",
  RUNNING: "RUNNING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};