<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "../../api";
import { useToast } from "vue-toastification";

const router = useRouter();
const route = useRoute();
const toast = useToast();

const nama = ref("");
const nomor = ref("");
const jabatan = ref("");
const departmen = ref("");
const tanggalMasuk = ref("");
const foto = ref("");
const status = ref("");
const dataFoto = ref("");
const localFoto = ref("");

const errors = ref([]);
const workStatuses = ref([]);
const departments = ref([]);

const findEmployee = async () => {
  const id = route.params.id;

  await api.get(`api/v1/employees/find/${id}`).then((response) => {
    const data = response.data.data;

    nama.value = data.nama;
    nomor.value = data.nomor;
    jabatan.value = data.jabatan;
    tanggalMasuk.value = data.tanggal_masuk;
    departmen.value = data.departmen;
    status.value = data.status;
    dataFoto.value = data.foto;

    console.log(nama.value);
  });
};

const fetchDataWorkStatuses = async () => {
  //fetch data
  await api
    .get("/api/v1/work-statuses")

    .then((response) => {
      //set response data to state "employees"
      workStatuses.value = response.data.data;
      console.log(response.data.data);
    });
};

const fetchDataDepartments = async () => {
  //fetch data
  await api
    .get("/api/v1/departments")

    .then((response) => {
      //set response data to state "employees"
      departments.value = response.data.data;
      console.log(response.data.data);
    });
};

const capitalized = (name) => {
  const capitalizedFirst = name[0].toUpperCase();
  const rest = name.slice(1);

  return capitalizedFirst + rest;
};

onMounted(() => {
  findEmployee();
  fetchDataWorkStatuses();
  fetchDataDepartments();
});

const handleFileChange = (e) => {
  //assign file to state
  foto.value = e.target.files[0];
  localFoto.value = URL.createObjectURL(e.target.files[0]);
};

const updateEmployee = async () => {
  //init formData
  let formData = new FormData();

  //assign state value to formData
  formData.append("nama", nama.value);
  formData.append("nomor", nomor.value);
  formData.append("jabatan", jabatan.value);
  formData.append("departmen", departmen.value);
  formData.append("tanggal_masuk", tanggalMasuk.value);
  if (foto.value != "") {
    formData.append("foto", foto.value);
  }
  formData.append("status", status.value);

  const id = route.params.id;

  //store data with API
  await api
    .post(`/api/v1/employees/update/${id}?_method=PUT`, formData)
    .then(() => {
      toast.success("Karyawan berhasil diubah", {
        timeout: 2000,
      });
      //redirect
      router.push({ path: "/employee" });
    })
    .catch((error) => {
      //assign response error data to state "errors"
      errors.value = error.response.data.data;
      console.log(error.response);
    });
};
</script>

<template>
  <h2 class="page-title">Ubah Karyawan</h2>

  <div class="card p-32 mt-72">
    <div class="title-card mb-4">Form Karyawan</div>
    <form @submit.prevent="updateEmployee()">
      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <label class="form-label fw-bold">Nama</label>
            <input
              type="text"
              class="form-control"
              v-model="nama"
              placeholder="Nama"
            />
            <div v-if="errors.nama" class="alert alert-danger mt-2">
              <span>{{ errors.nama[0] }}</span>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Nomor</label>
            <input
              type="text"
              class="form-control"
              v-model="nomor"
              placeholder="Nomor"
            />
            <div v-if="errors.nomor" class="alert alert-danger mt-2">
              <span>{{ errors.nomor[0] }}</span>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Tanggal Masuk</label>
            <input
              type="date"
              class="form-control"
              v-model="tanggalMasuk"
              placeholder="Tanggal Masuk"
            />
            <div v-if="errors.tanggal_masuk" class="alert alert-danger mt-2">
              <span>{{ errors.tanggal_masuk[0] }}</span>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Jabatan</label>
            <input
              type="text"
              class="form-control"
              v-model="jabatan"
              placeholder="Jabatan"
            />
            <div v-if="errors.jabatan" class="alert alert-danger mt-2">
              <span>{{ errors.jabatan[0] }}</span>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Departmen</label>
            <select v-model="departmen" class="form-select">
              <option disabled value="">Pilih</option>
              <option
                v-for="(item, index) in departments"
                :key="index"
                :value="item.value"
              >
                {{ capitalized(item.value) }}
              </option>
              s
            </select>
            <div v-if="errors.departmen" class="alert alert-danger mt-2">
              <span>{{ errors.departmen[0] }}</span>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Status</label>
            <select v-model="status" class="form-select">
              <option disabled value="">Pilih</option>
              <option
                v-for="(workStatus, index) in workStatuses"
                :key="index"
                :value="workStatus.value"
              >
                {{ capitalized(workStatus.value) }}
              </option>
            </select>
            <div v-if="errors.status" class="alert alert-danger mt-2">
              <span>{{ errors.status[0] }}</span>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label class="form-label fw-bold">Foto</label>
            <input
              type="file"
              class="form-control"
              @change="handleFileChange($event)"
            />
            <div v-if="errors.foto" class="alert alert-danger mt-2">
              <span>{{ errors.foto[0] }}</span>
            </div>
          </div>
          <img
            v-if="localFoto"
            :src="localFoto"
            width="300"
            height="300"
            class="rounded"
          />
          <img
            v-else
            :src="dataFoto"
            width="300"
            height="300"
            class="rounded"
          />
        </div>
      </div>

      <div class="d-flex">
        <button
          type="submit"
          class="btn btn-md btn-primary rounded-sm shadow border-0"
        >
          Submit
        </button>
        <router-link
          :to="{ name: 'employee.index' }"
          class="btn btn-danger ms-2"
          >Cancel</router-link
        >
      </div>
    </form>
  </div>
</template>
