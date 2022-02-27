<template>
    <div class="wizard-error">
        <div class="wizard-error-icon">
            <slot name="icon" v-bind="this">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="#b10805" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                </svg>
            </slot>
        </div>

        <div>
            <div class="wizard-error-body">
                <h3 v-if="title" class="wizard-error-title" v-html="title" />

                <slot v-bind="this">
                    <div v-if="isString">
                        {{ errors }}
                    </div>
                    <div v-else-if="isError">
                        {{ errors.message }}
                    </div>
                    <div v-else>
                        <ul class="wizard-error-list">
                            <li v-for="(message, i) in errors" :key="i">
                                {{ message }}
                            </li>
                        </ul>
                    </div>
                </slot>
            </div>

            <btn :size="size" variant="danger" block @click="e => $emit('fix', e, error)">
                Fix Errors
            </btn>
        </div>
    </div>
</template>

<script>
import { Btn } from '@vue-interface/btn';
import { Sizeable } from '@vue-interface/sizeable';

export default {

    name: 'WizardError',

    components: {
        Btn
    },

    mixins: [
        Sizeable
    ],

    props: {

        title: {
            type: String,
            default: 'Error!'
        },
        
        error: {
            type: Error,
            required: true,
        },

        extract: {
            type: Function,
            default(e) {
                // If axios errors, try to get the errors from the response.
                if(e.response && e.response.data.errors) {
                    return e.response.data.errors;
                }
                
                return e;
            }
        }

    },

    data() {
        return {
            errors: this.extract(this.error)
        };
    },

    computed: {
        isString() {
            return typeof this.errors === 'string';
        },
        isError() {
            return this.errors instanceof Error;
        }
    }

};
</script>

<style>
.wizard-error {
    text-align: center;
    font-size: 1.25rem;
    padding: calc(1.25rem * 4) 1.25rem;
}

.wizard-error-title {
    font-size: 2.5rem;
    color: #b10805;
    margin-bottom: .25rem;
}

.wizard-error-body {
    margin-bottom: 1rem;
}

.wizard-error-list {
    margin: 0 auto;
    list-style: disc;
    text-align: left;
    display: inline-flex;
    flex-direction: column;
}

.wizard-error-icon {
    color: #b10805;
    font-size: 1.25rem;
    border: 5px solid #b10805;
    border-radius: 100%;
    text-align: center;
    width: 7rem;
    height: 7rem;
    margin: 1rem auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.wizard-error-icon svg {
    width: 100%;
    line-height: 0;
}
</style>
