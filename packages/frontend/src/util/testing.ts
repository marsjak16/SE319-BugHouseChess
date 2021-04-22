import {ReactTestInstance} from "react-test-renderer";

export function changeInput(inputInstance: ReactTestInstance, newValue: string) {
    inputInstance.props.onChange({
        target: {
            value: newValue
        }
    })
}