<template>
  <v-row dense>
    <v-col cols="12" sm="12">
      <v-toolbar dense elevation="1">
        <v-toolbar-title>
          Workflow:
        </v-toolbar-title>

        <v-toolbar-items>
          <v-select
            v-model="selectedWorkflow"
            item-text="name"
            :item-value="v => v"
            solo
            flat
            :items="workflows"
          >
            <template v-slot:label>
              <span class="selector-label subtitle-1">select workflow</span>
            </template>
            <template v-slot:selection>
              <span class="title">{{selectedWorkflow.name}}</span>
            </template>
          </v-select>
        </v-toolbar-items>

        <template v-slot:extension>
          <v-tabs
            v-model="tab"
            align-with-title
          >
            <v-tab v-for="tab in tabItems" :key="tab">
              {{ tab }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </v-col>

    <v-col
      cols="12"
      sm="12"
      v-if="selectedWorkflow"
    >
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <!--fixme: idk how to set full height on parent-->
          <WorkflowGraphMonitoring
            :key="selectedWorkflow.id"
            style="height: calc(100vh - 240px)"
            :workflow="selectedWorkflow"
          />
        </v-tab-item>
        <v-tab-item>
          <TaskDurationMonitoring
            :key="selectedWorkflow.id"
            :workflow="selectedWorkflow"
          />
        </v-tab-item>
        <v-tab-item>
          <GanttChartMonitoring
            :key="selectedWorkflow.id"
            :workflow="selectedWorkflow"
          />
        </v-tab-item>
        <v-tab-item>
          <CpuUsageMonitoring
            :key="selectedWorkflow.id"
            :workflow="selectedWorkflow"
          />
        </v-tab-item>
        <v-tab-item>
          <RamUsageMonitoring
            :key="selectedWorkflow.id"
            :workflow="selectedWorkflow"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>
  import WorkflowGraphMonitoring from "./WorkflowGraphMonitoring";
  import workflowApi from "../../api/workflowApi";
  import {debug} from "../../utils/logging";
  import TaskDurationMonitoring from "./TaskDurationMonitoring";
  import GanttChartMonitoring from "./GanttChartMonitoring";
  import RamUsageMonitoring from "./RamUsageMonitoring";
  import CpuUsageMonitoring from "./CpuUsageMonitoring";

  export default {
    name: "Monitoring",
    components: {
      CpuUsageMonitoring,
      RamUsageMonitoring, GanttChartMonitoring, TaskDurationMonitoring, WorkflowGraphMonitoring},
    data() {
      return {
        tabItems: ["Graph View", "Task Duration", "Gantt Chart", "CPU Usage", "RAM Usage"],
        tab: null,
        workflows: [],
        selectedWorkflow: null
      }
    },
    methods: {
      getWorkflows() {
        workflowApi.getWorkflows().then(response => {
          const allWorkflowsDto = response.data;
          debug("getWorkflows", "allWorkflowsDto", allWorkflowsDto);
          this.workflows = allWorkflowsDto.items;
        })
      }
    },
    beforeMount() {
      this.getWorkflows();
    }
  }
</script>

<style scoped>
  .selector-label {
    line-height: 1.3em;
  }
</style>