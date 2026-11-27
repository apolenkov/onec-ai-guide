(() => {
  const lesson = document.querySelector(".order-demo");
  if (!lesson) return;

  const controls = lesson.querySelector(".demo-controls");
  const instruction = lesson.querySelector("[data-demo-instruction]");
  const outcome = lesson.querySelector(".demo-result");
  const fallback = lesson.querySelector(".demo-fallback");
  const result = lesson.querySelector("[data-demo-result]");
  const check = lesson.querySelector("[data-demo-check]");
  const confirm = lesson.querySelector("[data-demo-confirm]");

  const selected = (name) =>
    lesson.querySelector(`input[name="${name}"]:checked`).value;

  function updateResult(confirmed = false) {
    const address = selected("lesson-address");
    const action = selected("lesson-action");
    const needsConfirmation = action === "post" && address === "empty" && !confirmed;
    outcome.dataset.state = needsConfirmation ? "warning" : "success";
    confirm.hidden = !needsConfirmation;

    if (action === "draft") {
      check.textContent =
        address === "empty"
          ? "Сохранить черновик с пустым адресом без предупреждения о проведении."
          : "Сохранить черновик с адресом без предупреждения.";
      result.textContent =
        address === "empty"
          ? "Черновик сохранен. Предупреждение о проведении не появляется."
          : "Черновик сохранен. Предупреждение не требуется.";
      return;
    }

    if (address === "filled") {
      check.textContent = "Провести заказ с адресом без предупреждения.";
      result.textContent =
        "Адрес заполнен. Заказ проводится без предупреждения.";
      return;
    }

    if (confirmed) {
      check.textContent = "После подтверждения провести заказ по прежним правилам.";
      result.textContent =
        "Менеджер подтвердил действие. Заказ проведен без адреса.";
      return;
    }

    check.textContent =
      "Показать предупреждение и после подтверждения провести заказ.";
    result.textContent =
      "Адрес не заполнен. Перед проведением появится предупреждение.";
  }

  lesson.addEventListener("change", (event) => {
    if (
      event.target.matches('input[name="lesson-address"]') ||
      event.target.matches('input[name="lesson-action"]')
    ) {
      updateResult();
    }
  });

  confirm.addEventListener("click", () => {
    updateResult(true);
    result.focus();
  });

  fallback.hidden = true;
  controls.hidden = false;
  instruction.hidden = false;
  updateResult();
})();
