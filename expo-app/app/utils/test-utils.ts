import { act, render, RenderResult } from "@testing-library/react-native";
import { screen } from "@testing-library/react-native";

export async function flush() {
    await act(async () => await flushPromises());
}

function flushPromises() {
    return new Promise(setImmediate);
}

export function findElement(testId: string) {
    return screen.getAllByTestId(testId)[0];
}

export async function renderComponent(component: React.JSX.Element): Promise<RenderResult> {
    const renderResult = render(component);
    await flush();
    return renderResult;
}

/**
 * Useful for mocking functions
 * @returns nothing
 */
export function doNothing(): void {
    return;
}