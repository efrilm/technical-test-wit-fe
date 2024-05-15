<script setup>
//import ref and onMounted
import { ref, onMounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useToast } from "vue-toastification";
import SimpleDropdown from "@kouts/vue-simple-dropdown";

import {
  faArrowUpShortWide,
  faFilter,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

//import api
import api from "../../api";

//define state
const employees = ref([]);
const file = ref("");
const errors = ref([]);
const isImport = ref(false);

const toast = useToast();

const headers = [
  { text: "Nama Karyawan", value: "nama" },
  { text: "Nomor Karyawan", value: "nomor" },
  { text: "Jabatan", value: "jabatan" },
  { text: "Departmen", value: "departmen" },
  { text: "Tanggal Masuk", value: "tanggal_masuk" },
  { text: "Photo", value: "foto" },
  { text: "Status", value: "status" },
  { text: "", value: "action" },
];

const fetchDataemployees = async () => {
  //fetch data
  await api
    .get("/api/v1/employees")

    .then((response) => {
      //set response data to state "employees"
      employees.value = response.data.data;
      console.log(response.data.data);
    });
};

const deleteEmployee = async (id) => {
  //delete post with API
  await api.delete(`/api/v1/employees/delete/${id}`).then(() => {
    toast.success("Delete Employee Succesfully", {
      timeout: 2000,
    });
    fetchDataemployees();
  });
};

const exportCsv = async () => {
  await api
    .get("api/v1/export-imports/export-excel", { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data-karyawan.xlsx");
      document.body.appendChild(link);
      link.click();
      console.log(response.data);
    });
};

const exportPdf = async () => {
  await api
    .get("api/v1/export-imports/export-pdf", { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data-karyawan.pdf");
      document.body.appendChild(link);
      link.click();
      console.log(response.data);
    });
};

const handleIsImport = () => {
  isImport.value = !isImport.value;
};

const importCsv = async () => {
  let formData = new FormData();

  formData.append("file", file.value);

  await api.post("api/v1/export-imports/import", formData).then((response) => {
    isImport.value = false;
    toast.success("Import Csv Succesfully", {
      timeout: 2000,
    });
    fetchDataemployees();
  });
};

const handleFileChange = (e) => {
  file.value = e.target.files[0];
};

//run hook "onMounted"
onMounted(() => {
  fetchDataemployees();
});
</script>

<template>
  <h2 class="page-title">Halaman Karyawan</h2>

  <div class="card mt-72" v-if="isImport">
    <div class="card-body">
      <div class="title-card">Import Csv</div>
      <form @submit.prevent="importCsv()">
        <div class="row mt-5">
          <div class="col">
            <div class="mb-3">
              <label class="form-label fw-bold">File</label>
              <input
                type="file"
                class="form-control"
                @change="handleFileChange($event)"
              />
              <div v-if="errors.file" class="alert alert-danger mt-2">
                <span>{{ errors.file[0] }}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-md btn-primary rounded-sm shadow border-0"
        >
          Save
        </button>
      </form>
    </div>
  </div>

  <div class="basic-card mt-72">
    <div class="row">
      <div class="col-md-8">
        <div class="title-card mt-32 ml-32">Data Karyawan</div>
      </div>
      <div class="col-md-4">
        <div class="d-flex justify-content-end">
          <div class="icon-hz mt-32 mr-32">
            <FontAwesomeIcon :icon="faArrowUpShortWide" />
            <span>Sort</span>
          </div>
          <div class="icon-hz mt-32 mr-32">
            <FontAwesomeIcon :icon="faFilter" />
            <span>Filter</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row section-button">
      <div class="col-md-6">
        <div class="d-flex align-items-start">
          <router-link
            :to="{ name: 'employee.create' }"
            class="btn btn-primary mr-21 mb-12"
            >Tambah Karyawan</router-link
          >
          <button @click="handleIsImport" class="btn btn-primary mb-12">
            Import CSV
          </button>
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex justify-content-end">
          <button @click="exportCsv" class="btn btn-primary mr-21 mb-12">
            Ekspor CSV
          </button>
          <button class="btn btn-primary mb-12" @click="exportPdf">
            Ekspor PDF
          </button>
        </div>
      </div>
    </div>
    <EasyDataTable
      :headers="headers"
      :items="employees"
      table-class-name="customize-table"
    >
      <template #item-status="{ status }">
        <div
          class="status-card"
          :style="`${
            status == 'probation'
              ? 'background-color: #F1A22B'
              : status == 'tetap'
              ? 'background-color: #00FF00'
              : 'background-color: #3751FF'
          }`"
        >
          {{ status.toUpperCase() }}
        </div>
      </template>
      <template #item-foto="{ foto }">
        <img
          :src="foto"
          :alt="foto"
          class="rounded my-2"
          width="50"
          height="50"
        />
      </template>
      <template #item-action="item">
        <div class="d-flex button-datatable">
          <router-link
            :to="{ name: 'employee.edit', params: { id: item.id } }"
            class="edit"
            ><FontAwesomeIcon :icon="faEdit" />
          </router-link>
          <div @click.prevent="deleteEmployee(item.id)" class="trash">
            <FontAwesomeIcon :icon="faTrash" />
          </div>
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>
