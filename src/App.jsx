import { KetcherView } from "./Ketcher"

function App() {
  return (
    <>
      <div>
        <div style={{ height: "2000px", backgroundColor: "#CAF1DE" }}>
          <span>Scroll down to ketcher editor</span>
        </div>

        <KetcherView />

        <div style={{ height: "1000px", backgroundColor: "#BCCBC9" }}></div>
      </div>
    </>
  )
}

export default App
