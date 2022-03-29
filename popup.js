const pickColorBtn = document.querySelector(".pickColorBtn");
const color = document.querySelector(".color");
const colorHex = document.querySelector(".colorHex");

pickColorBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript(
    {
      target: {
        tabId: tab.id,
      },
      function: pickColor,
    },
    async (pickerResult) => {
      const [data] = pickerResult;
      if (data.result) {
        hexValue = data.result.sRGBHex;
        color.style.backgroundColor = hexValue;
        colorHex.innerText = hexValue;
        try {
          await navigator.clipboard.writeText(hexValue);
        } catch (error) {
          console.log(error);
        }
      }
    }
  );
});

const pickColor = async () => {
  try {
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
  } catch (err) {
    console.log(err);
  }
};
