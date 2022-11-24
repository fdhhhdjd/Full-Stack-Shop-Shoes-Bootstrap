<template>
    <el-dropdown
        class="international"
        trigger="click"
        @command="handleSetLanguage"
    >
        <div>
            <svg-icon icon-class="language"/>
        </div>
        <el-dropdown-menu
            slot="dropdown"
            class="dropdown-language"
        >
            <el-dropdown-item
                :disabled="language==='en'"
                command="en"
            >
                English
            </el-dropdown-item>
            <el-dropdown-item
                :disabled="language==='vi'"
                command="vi"
            >
                Vietnamese
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
    computed: {
        language() {
            return this.$store.getters.language
        }
    },
    methods: {
        handleSetLanguage(lang) {
            this.$i18n.locale = lang
            this.$store.dispatch('app/setLanguage', lang)
            this.$message({
                message: this.$t('langselect.switchlang'),
                type: 'success'
            })
        }
    }
}
</script>
<style
    lang="scss"
    scoped
>
.dropdown-language {
    z-index: 40000 !important;
}
</style>
