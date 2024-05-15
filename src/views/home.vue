<script setup>
import { ref, onMounted } from "vue";
import PieChart from "../components/PieChart.vue";
import api from "../api";

const allEmployee = ref(0);
const contract = ref(0);
const probation = ref(0);

const loaded = ref(false);

const label = ref([]);
const value = ref([]);

const fetchDataDashboard = async () => {
  loaded.value = false;
  api.get("api/v1/employees/count").then((response) => {
    label.value = [];
    s;
    value.value = [];

    const data = response.data.data;

    allEmployee.value = data.all_employee;
    contract.value = data.contract;
    probation.value = data.probation;
    label.value = data.distributions.label;
    value.value = data.distributions.series;

    loaded.value = true;
  });
};

onMounted(() => {
  fetchDataDashboard();
});
</script>

<template>
  <h2 class="page-title">Halaman Dashboard</h2>
  <div class="row">
    <div class="col-md-4 mt-54">
      <div class="basic-card p-38-39">
        <div class="count-text">Total Karyawan</div>
        <div class="count-value">{{ allEmployee }}</div>
      </div>
    </div>
    <div class="col-md-4 mt-54">
      <div class="basic-card p-38-39">
        <div class="count-text blue-color">Kontrak</div>
        <div class="count-value blue-color">{{ contract }}</div>
      </div>
    </div>
    <div class="col-md-4 mt-54">
      <div class="basic-card p-38-39">
        <div class="count-text yellow-color">Probation</div>
        <div class="count-value yellow-color">{{ probation }}</div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-5 mt-40">
      <div class="basic-card p-40-29">
        <div class="count-text black-color">Distribusi Department Karyawan</div>
        <PieCharts :label="label" :valueData="value" />
      </div>
    </div>
  </div>
</template>
