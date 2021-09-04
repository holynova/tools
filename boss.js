function main() {
  const $ = document.querySelector.bind(document);
  let elems = [
    $(".switch-templates-wrapper .header"),
    $(".switch-templates-wrapper .select-templates-box"),
  ];

  elems.forEach((x) => {
    x.style.display = "none";
  });

  $(".preview-box").style.width = "100%";
}

main();
