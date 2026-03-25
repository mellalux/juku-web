let appBootstrapPromise = null;

async function startAppBootstrap() {
  if (!appBootstrapPromise) {
    document.documentElement.dataset.appBootState = "loading";
    appBootstrapPromise = import("./app-bootstrap.js")
      .then(({ bootApp }) => {
        bootApp();
        document.documentElement.dataset.appBootState = "ready";
      })
      .catch((error) => {
        document.documentElement.dataset.appBootState = "error";
        console.error("App bootstrap failed", error);
        throw error;
      });
  }
  return appBootstrapPromise;
}

function scheduleAppBootstrap() {
  window.requestAnimationFrame(() => {
    void startAppBootstrap();
  });
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", scheduleAppBootstrap, { once: true });
} else {
  scheduleAppBootstrap();
}
