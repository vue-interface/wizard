<template>
    <div class="card">
        <wizard size="lg" :submit="submit" :errors="e => [e.message]" @fix="(e, wizard) => wizard.currentActive = 1">
            <wizard-step label="Name" :submit="() => delay()" :validate-back="false" :validate-submit="() => !!form.first && !!form.last" @enter="onEnter">
                <input-field v-model="form.first" size="lg" label="What is your first name?" placeholder="John" class="mb-3" />
                <input-field v-model="form.last" size="lg" label="What is your last name?" placeholder="Smith" />
            </wizard-step>
            <wizard-step label="Email Address" :back="() => delay()" :validate-submit="() => !!form.email">
                <input-field v-model="form.email" size="lg" label="What is your email address?" placeholder="you@example.com" />
            </wizard-step>
            <wizard-step label="Age" :submit="() => delay()" :validate-submit="() => !!`${form.age}`.match(/\d+/)">
                <input-field v-model="form.age" size="lg" label="Optionally, tell us your age?" />
            </wizard-step>
        </wizard>
    </div>
</template>

<script>
import { InputField } from '@vue-interface/input-field';
import { Wizard, WizardStep } from '../index.js';
            
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

                wizard.failed(e);
            });
        },
        delay(timeout) {
            return new Promise(resolve => setTimeout(resolve, timeout || 1000));
        },
        onEnter(slide) {
            // console.log('enter', slide, slide.componentInstance.validateSubmit, slide.componentInstance.submit);
        }
    }
};
</script>