<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPieChart, faBook } from "@fortawesome/free-solid-svg-icons";
import SvgLogo from "../assets/logo.svg";

const isExpanded = ref(true);

const handleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <aside id="sidebar" :class="`${isExpanded == true ? 'expand' : ''}`">
    <div
      class="d-flex"
      :style="`${
        isExpanded == true
          ? 'padding: 2.3125rem 1.1875rem 0 2rem'
          : 'padding: 2rem 1rem'
      }`"
    >
      <button @click="handleExpand()" class="toggle-btn" type="button">
        <SvgLogo></SvgLogo>
      </button>
      <div class="sidebar-logo">
        <a href="#">Human Resources</a>
      </div>
    </div>
    <ul class="sidebar-nav">
      <li class="active sidebar-item">
        <router-link
          :to="{ name: 'home' }"
          active-class="active"
          class="sidebar-link"
        >
          <FontAwesomeIcon :icon="faPieChart" />
          <span>Dashboard</span>
        </router-link>
      </li>
      <li class="sidebar-item">
        <router-link
          :to="{ name: 'employee.index' }"
          active-class="active"
          class="sidebar-link"
        >
          <FontAwesomeIcon :icon="faBook" />
          <span>Karyawan</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>
