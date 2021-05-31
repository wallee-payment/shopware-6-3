/* global Shopware */

import template from './index.html.twig';
import constants from './configuration-constants';

const {Component, Mixin} = Shopware;

Component.register('wallee-settings', {

    template: template,

    inject: [
        'WalleeConfigurationService'
    ],

    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {

            config: {},

            isLoading: false,

            isSaveSuccessful: false,
            isShowcase: false,

            applicationKeyFilled: false,
            applicationKeyErrorState: false,

            spaceIdFilled: false,
            spaceIdErrorState: false,

            userIdFilled: false,
            userIdErrorState: false,

            isSetDefaultPaymentSuccessful: false,
            isSettingDefaultPaymentMethods: false,

            configIntegrationDefaultValue: 'iframe',
            configEmailEnabledDefaultValue: true,
            configLineItemConsistencyEnabledDefaultValue: true,
            configStorefrontInvoiceDownloadEnabledEnabledDefaultValue: true,

            ...constants
        };
    },

    props: {
        isLoading: {
            type: Boolean,
            required: true
        }
    },

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    watch: {
        config: {
            handler() {
                const defaultConfig = this.$refs.configComponent.allConfigs.null;
                const salesChannelId = this.$refs.configComponent.selectedSalesChannelId;
                this.isShowcase = this.config[this.CONFIG_IS_SHOWCASE];
                if (salesChannelId === null) {

                    this.applicationKeyFilled = !!this.config[this.CONFIG_APPLICATION_KEY];
                    this.spaceIdFilled = !!this.config[this.CONFIG_SPACE_ID];
                    this.userIdFilled = !!this.config[this.CONFIG_USER_ID];

                    if (!(this.CONFIG_INTEGRATION in this.config)) {
                        this.config[this.CONFIG_INTEGRATION] = this.configIntegrationDefaultValue;
                    }

                    if (!(this.CONFIG_EMAIL_ENABLED in this.config)) {
                        this.config[this.CONFIG_EMAIL_ENABLED] = this.configEmailEnabledDefaultValue;
                    }

                    if (!(this.CONFIG_LINE_ITEM_CONSISTENCY_ENABLED in this.config)) {
                        this.config[this.CONFIG_LINE_ITEM_CONSISTENCY_ENABLED] = this.configLineItemConsistencyEnabledDefaultValue;
                    }

                    if (!(this.CONFIG_STOREFRONT_INVOICE_DOWNLOAD_ENABLED in this.config)) {
                        this.config[this.CONFIG_STOREFRONT_INVOICE_DOWNLOAD_ENABLED] = this.configStorefrontInvoiceDownloadEnabledEnabledDefaultValue;
                    }

                } else {

                    this.applicationKeyFilled = !!this.config[this.CONFIG_APPLICATION_KEY] || !!defaultConfig[this.CONFIG_APPLICATION_KEY];
                    this.spaceIdFilled = !!this.config[this.CONFIG_SPACE_ID] || !!defaultConfig[this.CONFIG_SPACE_ID];
                    this.userIdFilled = !!this.config[this.CONFIG_USER_ID] || !!defaultConfig[this.CONFIG_USER_ID];


                    if (!(this.CONFIG_INTEGRATION in this.config) || !(this.CONFIG_INTEGRATION in defaultConfig)) {
                        this.config[this.CONFIG_INTEGRATION] = this.configIntegrationDefaultValue;
                    }

                    if (!(this.CONFIG_EMAIL_ENABLED in this.config) || !(this.CONFIG_EMAIL_ENABLED in defaultConfig)) {
                        this.config[this.CONFIG_EMAIL_ENABLED] = this.configEmailEnabledDefaultValue;
                    }

                    if (!(this.CONFIG_LINE_ITEM_CONSISTENCY_ENABLED in this.config) || !(this.CONFIG_LINE_ITEM_CONSISTENCY_ENABLED in defaultConfig)) {
                        this.config[this.CONFIG_LINE_ITEM_CONSISTENCY_ENABLED] = this.configLineItemConsistencyEnabledDefaultValue;
                    }

                    if (!(this.CONFIG_STOREFRONT_INVOICE_DOWNLOAD_ENABLED in this.config) || !(this.CONFIG_STOREFRONT_INVOICE_DOWNLOAD_ENABLED in defaultConfig)) {
                        this.config[this.CONFIG_STOREFRONT_INVOICE_DOWNLOAD_ENABLED] = this.configStorefrontInvoiceDownloadEnabledEnabledDefaultValue;
                    }
                }
            },
            deep: true
        }
    },

    methods: {

        onSave() {
            if (!(this.spaceIdFilled && this.userIdFilled && this.applicationKeyFilled)) {
                this.setErrorStates();
                return;
            }
            this.save();
        },

        save() {
            this.isLoading = true;

            this.$refs.configComponent.save().then((res) => {
                if (res) {
                    this.config = res;
                }
                this.registerWebHooks();
                this.synchronizePaymentMethodConfiguration();
                this.installOrderDeliveryStates();
            }).catch(() => {
                this.isLoading = false;
            });
        },

        registerWebHooks() {
            this.WalleeConfigurationService.registerWebHooks(this.$refs.configComponent.selectedSalesChannelId)
                .then(() => {
                    this.createNotificationSuccess({
                        title: this.$tc('wallee-settings.settingForm.titleSuccess'),
                        message: this.$tc('wallee-settings.settingForm.messageWebHookUpdated')
                    });
                }).catch(() => {
                this.createNotificationError({
                    title: this.$tc('wallee-settings.settingForm.titleError'),
                    message: this.$tc('wallee-settings.settingForm.messageWebHookError')
                });
                this.isLoading = false;
            });
        },

        synchronizePaymentMethodConfiguration() {
            this.WalleeConfigurationService.synchronizePaymentMethodConfiguration(this.$refs.configComponent.selectedSalesChannelId)
                .then(() => {
                    this.createNotificationSuccess({
                        title: this.$tc('wallee-settings.settingForm.titleSuccess'),
                        message: this.$tc('wallee-settings.settingForm.messagePaymentMethodConfigurationUpdated')
                    });
                    this.isLoading = false;
                }).catch(() => {
                this.createNotificationError({
                    title: this.$tc('wallee-settings.settingForm.titleError'),
                    message: this.$tc('wallee-settings.settingForm.messagePaymentMethodConfigurationError')
                });
                this.isLoading = false;
            });
        },

        installOrderDeliveryStates(){
            this.WalleeConfigurationService.installOrderDeliveryStates()
                .then(() => {
                    this.createNotificationSuccess({
                        title: this.$tc('wallee-settings.settingForm.titleSuccess'),
                        message: this.$tc('wallee-settings.settingForm.messageOrderDeliveryStateUpdated')
                    });
                    this.isLoading = false;
                }).catch(() => {
                this.createNotificationError({
                    title: this.$tc('wallee-settings.settingForm.titleError'),
                    message: this.$tc('wallee-settings.settingForm.messageOrderDeliveryStateError')
                });
                this.isLoading = false;
            });
        },

        onSetPaymentMethodDefault() {
            this.isSettingDefaultPaymentMethods = true;
            this.WalleeConfigurationService.setWalleeAsSalesChannelPaymentDefault(
                this.$refs.configComponent.selectedSalesChannelId
            ).then(() => {
                this.isSettingDefaultPaymentMethods = false;
                this.isSetDefaultPaymentSuccessful = true;
            });
        },

        setErrorStates() {
            const messageNotBlankErrorState = {
                code: 1,
                detail: this.$tc('wallee-settings.messageNotBlank')
            };

            if (!this.spaceIdFilled) {
                this.spaceIdErrorState = messageNotBlankErrorState;
            }

            if (!this.userIdFilled) {
                this.userIdErrorState = messageNotBlankErrorState;
            }

            if (!this.applicationKeyFilled) {
                this.applicationKeyErrorState = messageNotBlankErrorState;
            }
        },
    }
});
