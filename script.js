document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const formAlert = document.getElementById("formAlert");
  const photoInput = document.getElementById("studentPhoto");
  const photoPreview = document.getElementById("photoPreview");
  const photoPlaceholder = document.getElementById("photoPlaceholder");
  const resetBtn = document.getElementById("resetBtn");

  // Modal Elements
  const receiptModal = document.getElementById("receiptModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const printBtn = document.getElementById("printBtn");
  const downloadJsonBtn = document.getElementById("downloadJsonBtn");
  const downloadCsvBtn = document.getElementById("downloadCsvBtn");

  let photoDataUrl = "";
  let latestRecord = null;

  // Photo upload & preview with 2MB validation
  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    setError("studentPhoto", "");
    if (!file) {
      photoDataUrl = "";
      photoPreview.classList.add("hidden");
      photoPlaceholder.classList.remove("hidden");
      return;
    }

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("studentPhoto", "Only JPG or PNG images are allowed.");
      photoInput.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("studentPhoto", "File size must be under 2 MB.");
      photoInput.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      photoDataUrl = e.target.result;
      photoPreview.src = photoDataUrl;
      photoPreview.classList.remove("hidden");
      photoPlaceholder.classList.add("hidden");
    };
    reader.readAsDataURL(file);
  });

  // Helper to display field errors
  function setError(id, message) {
    const input = document.getElementById(id);
    const errorEl = document.getElementById(`error-${id}`);
    if (errorEl) errorEl.textContent = message;
    if (input) {
      if (message) {
        input.classList.add("invalid");
      } else {
        input.classList.remove("invalid");
      }
    }
  }

  // Validate all fields
  function validateForm() {
    let isValid = true;

    const requiredTextFields = [
      { id: "firstName", label: "First name is required." },
      { id: "lastName", label: "Last name is required." },
      { id: "dob", label: "Date of birth is required." },
      { id: "gender", label: "Please select a gender." },
      { id: "address", label: "Permanent address is required." },
      { id: "city", label: "City is required." },
      { id: "state", label: "State is required." },
      { id: "program", label: "Please select a program." },
      { id: "semester", label: "Please select admission year/semester." },
      { id: "prevSchool", label: "Previous school/college is required." },
      { id: "percentage", label: "Aggregate score is required." },
      { id: "guardianName", label: "Guardian name is required." },
      { id: "guardianRelation", label: "Please select relationship." }
    ];

    requiredTextFields.forEach((field) => {
      const val = document.getElementById(field.id).value.trim();
      if (!val) {
        setError(field.id, field.label);
        isValid = false;
      } else {
        setError(field.id, "");
      }
    });

    // Photo check
    if (!photoDataUrl) {
      setError("studentPhoto", "Please upload a passport-size photo.");
      isValid = false;
    }

    // Email check
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("email", "Enter a valid email address.");
      isValid = false;
    } else {
      setError("email", "");
    }

    // 10-digit Mobile checks
    ["phone", "guardianPhone"].forEach((id) => {
      const val = document.getElementById(id).value.trim();
      if (!/^\d{10}$/.test(val)) {
        setError(id, "Enter a valid 10-digit mobile number.");
        isValid = false;
      } else {
        setError(id, "");
      }
    });

    // 6-digit PIN code check
    const pin = document.getElementById("pincode").value.trim();
    if (!/^\d{6}$/.test(pin)) {
      setError("pincode", "Enter a valid 6-digit PIN code.");
      isValid = false;
    } else {
      setError("pincode", "");
    }

    // Declaration checkbox
    const declaration = document.getElementById("declaration");
    if (!declaration.checked) {
      setError("declaration", "You must accept the declaration to proceed.");
      isValid = false;
    } else {
      setError("declaration", "");
    }

    return isValid;
  }

  // Form Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm()) {
      formAlert.classList.remove("hidden");
      formAlert.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    formAlert.classList.add("hidden");

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const regId = `REG-2026-${randomCode}`;
    const timestamp = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    });

    latestRecord = {
      registrationId: regId,
      submittedAt: timestamp,
      fullName: `${document.getElementById("firstName").value.trim()} ${document.getElementById("lastName").value.trim()}`,
      dob: document.getElementById("dob").value,
      gender: document.getElementById("gender").value,
      bloodGroup: document.getElementById("bloodGroup").value || "N/A",
      email: document.getElementById("email").value.trim(),
      phone: `+91 ${document.getElementById("phone").value.trim()}`,
      address: `${document.getElementById("address").value.trim()}, ${document.getElementById("city").value.trim()}, ${document.getElementById("state").value.trim()} - ${document.getElementById("pincode").value.trim()}`,
      program: document.getElementById("program").value,
      semester: document.getElementById("semester").value,
      previousInstitution: document.getElementById("prevSchool").value.trim(),
      aggregateScore: document.getElementById("percentage").value.trim(),
      guardianName: document.getElementById("guardianName").value.trim(),
      guardianRelation: document.getElementById("guardianRelation").value,
      guardianPhone: `+91 ${document.getElementById("guardianPhone").value.trim()}`
    };

    renderReceipt(latestRecord);
    receiptModal.classList.remove("hidden");
  });

  function renderReceipt(data) {
    document.getElementById("recId").textContent = data.registrationId;
    document.getElementById("recDate").textContent = data.submittedAt;
    document.getElementById("recPhoto").src = photoDataUrl;

    const rows = [
      ["Full Name", data.fullName],
      ["Date of Birth / Gender", `${data.dob} | ${data.gender}`],
      ["Blood Group", data.bloodGroup],
      ["Email Address", data.email],
      ["Mobile Number", data.phone],
      ["Permanent Address", data.address],
      ["Program Applied", data.program],
      ["Year / Semester", data.semester],
      ["Previous Institution", data.previousInstitution],
      ["Aggregate Score", data.aggregateScore],
      ["Guardian", `${data.guardianName} (${data.guardianRelation})`],
      ["Guardian Mobile", data.guardianPhone]
    ];

    const table = document.getElementById("receiptTable");
    table.innerHTML = rows
      .map(([label, val]) => `<tr><td>${label}</td><td>${val}</td></tr>`)
      .join("");
  }

  // Reset Handler
  resetBtn.addEventListener("click", () => {
    formAlert.classList.add("hidden");
    photoDataUrl = "";
    photoPreview.classList.add("hidden");
    photoPlaceholder.classList.remove("hidden");
    document.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));
    document.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
  });

  // Modal Controls
  closeModalBtn.addEventListener("click", () => {
    receiptModal.classList.add("hidden");
  });

  printBtn.addEventListener("click", () => {
    window.print();
  });

  downloadJsonBtn.addEventListener("click", () => {
    if (!latestRecord) return;
    const blob = new Blob([JSON.stringify(latestRecord, null, 2)], { type: "application/json" });
    triggerDownload(blob, `${latestRecord.registrationId}.json`);
  });

  downloadCsvBtn.addEventListener("click", () => {
    if (!latestRecord) return;
    const headers = Object.keys(latestRecord).join(",");
    const values = Object.values(latestRecord)
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",");
    const blob = new Blob([`${headers}
${values}`], { type: "text/csv" });
    triggerDownload(blob, `${latestRecord.registrationId}.csv`);
  });

  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
});
