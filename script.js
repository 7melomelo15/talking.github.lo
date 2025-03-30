function reserve() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  alert(`予約完了: ${date} に ${time}分`);
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  if (input.value.trim()) {
    alert(`メッセージ送信: ${input.value}`);
    input.value = '';
  }
}