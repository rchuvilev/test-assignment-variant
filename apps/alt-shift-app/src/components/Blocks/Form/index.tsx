import {Form as RadixForm} from "radix-ui";
import clsx from "clsx";

import style from './index.module.css';

type TProps = {
}

const Form = ({}: TProps) => {
    return (
        <RadixForm.Root
            className={clsx(
                style.Form,
            )}
            noValidate
        >
            <RadixForm.Field className="FormField" name="email">
                <div
                    style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                    }}
                >
                    <RadixForm.Label className="FormLabel">Email</RadixForm.Label>
                    <RadixForm.Message className="FormMessage" match="valueMissing">
                        Please enter your email
                    </RadixForm.Message>
                    <RadixForm.Message className="FormMessage" match="typeMismatch">
                        Please provide a valid email
                    </RadixForm.Message>
                </div>
                <RadixForm.Control asChild>
                    <input className="Input" type="email" required/>
                </RadixForm.Control>
            </RadixForm.Field>
            <RadixForm.Field className="FormField" name="question">
                <div
                    style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                    }}
                >
                    <RadixForm.Label className="FormLabel">Question</RadixForm.Label>
                    <RadixForm.Message className="FormMessage" match="valueMissing">
                        Please enter a question
                    </RadixForm.Message>
                </div>
                <RadixForm.Control asChild>
                    <textarea className="Textarea" required/>
                </RadixForm.Control>
            </RadixForm.Field>
            <RadixForm.Submit asChild>
                <button className="Button" style={{marginTop: 10}}>
                    Post question
                </button>
            </RadixForm.Submit>
        </RadixForm.Root>
    );
}

export {Form};
