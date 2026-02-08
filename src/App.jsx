import { ConfigProvider} from "antd";
import "./App.css";

function App() {
  return (
    <>
      Hellow
      <ConfigProvider
        theme={{
          components: {
            Select: {
              activeBorderColor: "rgb(250,59,59)",
              borderRadiusXS: 1,
            },
          },
        }}
      ></ConfigProvider>
    </>
  );
}

export default App;
