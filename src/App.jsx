import { useMemo, useRef, useState } from "react";
import { encrypt } from "./helpers/encrypt";
import { decrypt } from "./helpers/decrypt";

function App() {
  const inputRef = useRef(null);

  const [isLoading, setLoading] = useState(false);
  const [inputField, setInputField] = useState("");
  const [lastFileName, setFileName] = useState("file");
  const [variant, setVariant] = useState("encrypt");
  const [gamma, setGamma] = useState("");

  const outputField = useMemo(() => {
    if (gamma === "") return inputField;

    if (variant === "encrypt") {
      return encrypt(inputField, gamma);
    }

    return decrypt(inputField, gamma);
  }, [gamma, inputField, variant]);

  const showFile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        setInputField(text);
      };
      setFileName(e.target.files[0].name.split(".")[0]);
      reader.readAsText(e.target.files[0]);
    } catch {
      alert("Something wrong! Try again");
    } finally {
      setLoading(false);
    }
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    element.hidden = true;
    const file = new Blob([outputField], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${
      lastFileName ? `${lastFileName}_shifted` : "file_shifted"
    }.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-dvh w-full flex justify-center items-center p-40">
      <div className="flex flex-row w-full items-end gap-4">
        <div className="flex flex-col flex-1 gap-4">
          <div className="gap-4 flex flex-col">
            <select
              className="border p-2"
              value={variant}
              onChange={(e) => setVariant(e.currentTarget.value)}
            >
              <option label="Зашифрувати" value="encrypt" />
              <option label="Розшифрувати" value="decrypt" />
            </select>
            <label className="text-lg">Гамма</label>
            <input
              type="text"
              className="border p-2"
              value={gamma}
              onChange={(e) => setGamma(e.currentTarget.value)}
            />
          </div>
          <label className="text-lg">
            {variant === "encrypt" ? "Оригінальний текст" : "Криптограма"}
          </label>
          <textarea
            className="border p-2"
            value={inputField}
            onChange={(event) => setInputField(event.currentTarget.value)}
          />
          <button
            className="bg-black text-white px-4 py-2"
            onClick={() => inputRef.current?.click()}
          >
            {isLoading ? "Завантаження..." : "Додати файл"}
          </button>
          <input hidden ref={inputRef} type="file" onChange={showFile} />
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <textarea className="border p-2" readOnly value={outputField} />
          <button
            className="bg-black text-white px-4 py-2"
            onClick={downloadTxtFile}
          >
            Завантажити файл
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
