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
          <span v-if="hasNewCustomer" class="dot bg-danger" id="overlay"></span>
        </a>
      </li>
    </router-link>

    <router-link
      to="/admin"
      v-slot="{ href, navigate, isActive, isExactActive }"
      v-if="isAdmin"
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

    <router-link
      to="/tag"
      v-slot="{ href, navigate, isActive, isExactActive }"
      v-if="isAdmin"
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
        v-if="isSuperAdmin"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <span class="menu-text">
            {{ $t("MENU.ACTIVATION", { msg: "注册码" }) }}
          </span>
        </a>
      </li>
    </router-link>

    <router-link
      to="/histories"
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
        v-if="isSuperAdmin"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <span class="menu-text">
            {{ $t("MENU.ALL_HIS") }}
          </span>
        </a>
      </li>
    </router-link>

    <router-link
      to="/profile"
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
            {{ $t("MENU.PROF") }}
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
    ...mapGetters(["currentUser", "hasNewCustomer"]),

    isAdmin() {
      return this.currentUser.role_id < 4;
    },

    isSuperAdmin() {
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

<style scoped>
#overlay {
  bottom: 2em;
  right: 0.7em;
  position: absolute;
  z-index: 100;
}

.dot {
  height: 7px;
  width: 7px;
  border-radius: 50%;
  display: inline-block;
}
</style>
