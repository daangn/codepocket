(
  () => {
    Utils.removeDir(~path="../types")
    Utils.makeDir(~path="../types")
    let _ = Utils.readDir(~path="../json")
  }
)()
