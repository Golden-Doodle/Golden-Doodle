import { renderComponent } from "@/app/utils/test-utils";
import HomeMenuScreen from "../HomeMenuScreen";

test('HomeMenuScreen component renders correctly', () => {
    renderComponent(<HomeMenuScreen />);
});