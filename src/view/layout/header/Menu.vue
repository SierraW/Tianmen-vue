<template>
  <ul class="menu-nav">
    <router-link
      to="/dashboard"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <span class="menu-text">{{
            $t("MENU.DASHBOARD", { msg: "仪表板" })
          }}</span>
        </a>
      </li>
    </router-link>

    <router-link
      to="/ocean"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <span class="menu-text">
            {{ $t("CUSTOMER.OCEAN", { msg: "公海" }) }}
          </span>
        </a>
      </li>
    </router-link>

    <router-link
      to="/admin"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <span class="menu-text">
            {{ $t("MENU.ADMIN") }}
          </span>
        </a>
      </li>
    </router-link>

    <router-link to="/tag" v-slot="{ href, navigate, isActive, isExactActive }">
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <span class="menu-text">
            {{ $t("MENU.TAG") }}
          </span>
        </a>
      </li>
    </router-link>

    <router-link
      to="/activation_code"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
        v-if="isAdmin"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <span class="menu-text">
            {{ $t("MENU.ACTIVATION", { msg: "注册码" }) }}
          </span>
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "KTMenu",
  computed: {
    ...mapGetters(["currentUser"]),

    isAdmin() {
      return this.currentUser.role_id < 3;
    }
  },
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    }
  }
};
</script>
