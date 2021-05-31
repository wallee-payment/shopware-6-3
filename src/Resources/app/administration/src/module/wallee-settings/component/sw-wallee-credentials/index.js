/* global Shopware */

import template from './index.html.twig';
import constants from '../../page/wallee-settings/configuration-constants'

const {Component, Mixin} = Shopware;

Component.register('sw-wallee-credentials', {
    template: template,

    name: 'WalleeCredentials',

    mixins: [
        Mixin.getByName('notification')
    ],

    props: {
        actualConfigData: {
            type: Object,
            required: true
        },
        allConfigs: {
            type: Object,
            required: true
        },

        selectedSalesChannelId: {
            required: true
        },
        spaceIdFilled: {
            type: Boolean,
            required: true
        },
        spaceIdErrorState: {
            required: true
        },
        userIdFilled: {
            type: Boolean,
            required: true
        },
        userIdErrorState: {
            required: true
        },
        applicationKeyFilled: {
            type: Boolean,
            required: true
        },
        applicationKeyErrorState: {
            required: true
        },
        isLoading: {
            type: Boolean,
            required: true
        },
        isShowcase: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            ...constants
        };
    },

    computed: {},

    methods: {

        checkTextFieldInheritance(value) {
            if (typeof value !== 'string') {
                return true;
            }

            return value.length <= 0;
        },

        checkBoolFieldInheritance(value) {
            return typeof value !== 'boolean';
        }
    }
});
