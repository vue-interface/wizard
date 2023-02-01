<script lang="ts">
import { InputField } from '@vue-interface/input-field';
import { Wizard, WizardStep } from '../index';
            
export default {
    components: {
        InputField,
        Wizard,
        WizardStep
    },
    data() {
        return {
            form: {},
        };
    },
    methods: {
        promise(fn) {
            return new Promise(fn);
        },
        log(...args) {
            console.log(...args);
        },
        submit(wizard) {
            return new Promise((resolve, reject) => {
                this.delay().then(() => {
                    resolve();
                });
            }).then(() => {
                const e = new Error('This is a test error!');

                e.response = {
                    data: {
                        errors: [
                            'Error #1',
                            'Error #2',
                            'Error #3',
                        ]
                    }
                };

                console.log(wizard);

                wizard.failed(e);
            });
        },
        delay(timeout?) {
            return new Promise(resolve => setTimeout(resolve, timeout || 1000));
        },
        onAfterEnter(current, previous) {
            this.$el.querySelector('[name="email"]')?.focus();
        },
        onLeave(current, previous) {
            console.log('leave', current, previous);
        },
    }
};
</script>

<template>
    <div class="container mx-auto">
        <h1 class="text-5xl mb-5">
            wizard
        </h1>

        <div class="flex">
            <div class="w-1/2">
                <h2 class="text-2xl mb-3">
                    Validation
                </h2>

                <p>
                    One of the key components to building a successful multi-step form is being able to determine
                    when the user can go to the next step. This requires validating the data, enabling, or
                    disabling specific buttons. The validation function must return `true` or `false`.
                </p>

                <h2 class="text-2xl mt-6 mb-3">
                    Step Validation
                </h2>

                <p>
                    There are two main ways to validate the current step in the form. The easiest way is to validate
                    the data within each `wizard-step` component. This allows each step to have a unique validation
                    routine.
                </p>

                <h2 class="text-2xl mt-6 mb-3">
                    Global Validation
                </h2>

                <p>
                    The other way to validate the steps is by using a single global validation routine in the `wizard`
                    component.
                </p>
            </div>
            <div class="w-1/2 flex items-center justify-center">
                <div class="w-full">
                    <wizard
                        ref="wizard"
                        size="lg">
                        <wizard-step
                            label="Name"
                            :back-disabled="true"
                            :submit="({ failed }) => delay()"
                            :submit-disabled="() => !form.first || !form.last"
                            submit-label="Next Slide"
                            @leave="onLeave">
                            <input-field
                                v-model="form.first"
                                size="lg"
                                label="What is your first name?"
                                placeholder="John"
                                class="mb-3" />
                            <input-field
                                v-model="form.last"
                                size="lg"
                                label="What is your last name?"
                                placeholder="Smith" />
                        </wizard-step>
                        <wizard-step
                            label="Email Address"
                            :back="async() => await delay()"
                            :back-disabled="() => !form.email"
                            :submit-disabled="() => !form.email"
                            @after-enter="onAfterEnter">
                            <input-field
                                v-model="form.email"
                                name="email"
                                size="lg"
                                label="What is your email address?"
                                placeholder="you@example.com" />
                        </wizard-step>
                        <wizard-step
                            label="Age"
                            :back="() => delay()"
                            :submit="({ success }) => delay().finally(success)"
                            :submit-disabled="() => !`${form.age}`.match(/\d+/)">
                            <input-field
                                v-model="form.age"
                                size="lg"
                                label="Optionally, tell us your age?" />
                        </wizard-step>
                    </wizard>
                </div>
            </div>
        </div>
    </div>
</template>