import { lazy, useState, useRef, useEffect, Suspense, forwardRef, useImperativeHandle } from "react"

// import "ketcher-react/dist/index.css"
// import { StandaloneStructServiceProvider } from "ketcher-standalone"
// import { Editor } from "ketcher-react"
// const structServiceProvider = new StandaloneStructServiceProvider()

const Editor = lazy(() => import("ketcher-react").then((module) => ({ default: module.Editor })))

let structServiceProvider

async function getStructServiceProvider() {
  if (!structServiceProvider) {
    await import("ketcher-react/dist/index.css")
    const { StandaloneStructServiceProvider } = await import("ketcher-standalone")
    structServiceProvider = new StandaloneStructServiceProvider()
  }
  return structServiceProvider
}

export const MyKetcher = forwardRef(({ onChange, initialMolecule = "", ...props }, ref) => {
  const editorRef = useRef(null)
  const [structServiceProvider, setStructServiceProvider] = useState(null)

  useEffect(() => {
    getStructServiceProvider().then(setStructServiceProvider)
  }, [])

  return (
    <>
      {!structServiceProvider ? (
        <div>Loading...</div>
      ) : (
        <Suspense fallback={<div>Editor loading...</div>}>
          <Editor
            // staticResourcesUrl={""}
            structServiceProvider={structServiceProvider}
            onInit={(ketcher) => {
              editorRef.current = ketcher
              window.ketcher = ketcher
              if (initialMolecule) {
                window.ketcher.setMolecule(initialMolecule)
              }
            }}
          />
        </Suspense>
      )}
    </>
  )
})

export function KetcherView(props) {
  const editorRef = useRef(null)
  const [showEditor, setShowEditor] = useState(false)
  const [smiles, setSmiles] = useState("C1=CC=CC=C1")

  return (
    <>
      <button onClick={() => setShowEditor((prev) => !prev)}>{showEditor ? "hide" : "show"} editor</button>
      <span style={{ marginLeft: "10px" }}>The window will scroll to the top as soon as ketcher is loaded.</span>
      {showEditor && (
        <div style={{ height: "700px" }}>
          <MyKetcher ref={editorRef} onChange={(smiles) => setSmiles(smiles)} initialMolecule={smiles}></MyKetcher>
        </div>
      )}

      {/* <div style={{ height: "700px", visibility: showEditor ? "visible" : "hidden" }}>
        <MyKetcher ref={editorRef} onChange={(smiles) => setSmiles(smiles)} initialMolecule={smiles}></MyKetcher>
      </div> */}
    </>
  )
}
