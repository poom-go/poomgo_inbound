async function createReceipt() {
  const manager = document.getElementById("manager").value.trim();
  const client = document.getElementById("client").value.trim();
  const type = document.getElementById("type").value;
  const barcode = document.getElementById("barcode").value.trim();
  const qty = document.getElementById("qty").value;
  const memo = document.getElementById("memo").value.trim();

  if (!manager || !client || !type || !barcode || !qty) {
    alert("담당자, 고객사, 항목, 바코드, 수량은 필수입니다.");
    return;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "create",
      manager,
      client,
      type,
      barcode,
      qty,
      memo
    })
  });

  const data = await res.json();

  if (!data.success) {
    alert("접수 생성 실패");
    return;
  }

  const mobileUrl = `${location.origin}/mobile.html?id=${encodeURIComponent(data.receiptId)}`;

  document.getElementById("result").innerHTML = `
    <p><strong>접수번호:</strong> ${data.receiptId}</p>
    <p>아래 QR을 휴대폰으로 스캔해서 사진 업로드</p>
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(mobileUrl)}" alt="QR Code">
    <p><a href="${mobileUrl}" target="_blank">${mobileUrl}</a></p>
  `;
}
