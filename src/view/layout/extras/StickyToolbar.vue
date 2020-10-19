<template>
  <div>
    <!-- begin::Sticky Toolbar -->
    <ul class="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4">
      <li
        v-b-tooltip.hover.left="$t('MENU.DASHBOARD', { msg: '仪表板' })"
        class="nav-item mb-2"
      >
        <router-link
          to="/dashboard"
          class="btn btn-sm btn-icon btn-bg-light btn-text-primary btn-hover-primary"
        >
          <i class="flaticon2-menu-4"></i>
        </router-link>
      </li>
      <li
        v-b-tooltip.hover.left="$t('CUSTOMER.OCEAN', { msg: '公海' })"
        class="nav-item"
      >
        <router-link
          to="/ocean"
          class="btn btn-sm btn-icon btn-bg-light btn-text-warning btn-hover-warning"
        >
          <i class="flaticon2-drop"></i>
        </router-link>
      </li>
    </ul>
    <!-- end::Sticky Toolbar -->
  </div>
</template>

<script>
export default {
  name: "KTStickyToolbar"
};
</script>
