import { premierepro as app } from "../utils/premierepro";

export const notify = async (message: string) => {
  alert(message);
};

export const createBin = async (name: string) => {
  const project = await app.Project.getActiveProject();
  const root = await project.getRootItem();
  project.executeTransaction((actions: any) => {
    actions.addAction(root.createBinAction("Bin1", true));
  }, "Create Bin");
};
