<template>
    <div class="drawer-container">
        <div>
            <h3 class="drawer-title">{{ $t('settings.title') }}</h3>

            <div class="drawer-item">
                <span>{{ $t('settings.theme') }}</span>
                <theme-picker
                    style="float: right;height: 26px;margin: -3px 8px 0 0;"
                    @change="themeChange"
                />
            </div>

            <div class="drawer-item">
                <span>{{ $t('settings.tagsView') }}</span>
                <el-switch
                    v-model="tagsView"
                    class="drawer-switch"
                />
            </div>

            <div class="drawer-item">
                <span>{{ $t('settings.fixedHeader') }}</span>
                <el-switch
                    v-model="fixedHeader"
                    class="drawer-switch"
                />
            </div>

            <div class="drawer-item">
                <span>{{ $t('settings.sidebarLogo') }}</span>
                <el-switch
                    v-model="sidebarLogo"
                    class="drawer-switch"
                />
            </div>
            <div class="drawer-item">
                <span>{{ $t('settings.size') }}</span>
                <size-select class="size-select"/>
            </div>
            <div class="drawer-item">
                <span>Version:</span>
                <span class="drawer-switch">{{ version }}</span>
            </div>
            <a
                v-if="isShowJob"
                class="job-link"
                href="https://panjiachen.github.io/vue-element-admin-site/zh/job/"
                target="_blank"
            >
                <el-alert
                    :closable="false"
                    title="部门目前非常缺人！有兴趣的可以点击了解详情。坐标: 字节跳动"
                    type="success"
                />
            </a>

            <div
                v-if="lang === 'zh'"
                class="drawer-item"
            >
                <span>菜单支持拼音搜索</span>
                <el-switch
                    v-model="supportPinyinSearch"
                    class="drawer-switch"
                />
            </div>

        </div>
    </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
import LangSelect from '@/components/LangSelect'
import SizeSelect from '@/components/SizeSelect'

export default {
    components: { ThemePicker, LangSelect, SizeSelect },
    data() {
        return {}
    },
    computed: {
        isShowJob() {
            return this.$store.getters.language === 'zh'
        },
        fixedHeader: {
            get() {
                return this.$store.state.settings.fixedHeader
            },
            set(val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'fixedHeader',
                    value: val
                })
            }
        },
        tagsView: {
            get() {
                return this.$store.state.settings.tagsView
            },
            set(val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'tagsView',
                    value: val
                })
            }
        },
        sidebarLogo: {
            get() {
                return this.$store.state.settings.sidebarLogo
            },
            set(val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'sidebarLogo',
                    value: val
                })
            }
        },
        supportPinyinSearch: {
            get() {
                return this.$store.state.settings.supportPinyinSearch
            },
            set(val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'supportPinyinSearch',
                    value: val
                })
            }
        },
        lang() {
            return this.$store.getters.language
        },
        version() {
            return process.env.VUE_APP_VERSION
        }
    },
    methods: {
        themeChange(val) {
            this.$store.dispatch('settings/changeSetting', {
                key: 'theme',
                value: val
            })
        }
    }
}
</script>

<style
    lang="scss"
    scoped
>
.drawer-container {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, .85);
        font-size: 14px;
        line-height: 22px;
    }

    .drawer-item {
        color: rgba(0, 0, 0, .65);
        font-size: 14px;
        padding: 12px 0;
    }

    .drawer-switch {
        float: right
    }

    .job-link {
        display: block;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
    }

    .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
            cursor: pointer;
            transition: background .3s;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }
    }

    .lang-select {
        float: right;
        height: 26px;
        margin: -3px 8px 0 0;
        font-size: 22px;
    }

    .screen-full {
        float: right;
        height: 26px;
        margin: -3px 8px 0 0;
        font-size: 22px;
    }

    .size-select {
        float: right;
        height: 26px;
        margin: -3px 8px 0 0;
        font-size: 22px;
    }
}
</style>
