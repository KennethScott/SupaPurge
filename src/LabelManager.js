export class LabelManager {
  constructor() {
    this._userLabels = null;
  }

  get userLabels() {
    if (!this._userLabels) {
      this._userLabels = Gmail.Users.Labels.list('me').labels.filter((l) => l.type === 'user');
    }
    return this._userLabels;
  }

  getLabel(labelName) {
    let label = this.userLabels.find((l) => l.name === labelName);
    if (!label) {
      Logger.log('Label does not exist. Creating it.');
      label = this.createLabel(labelName);
    }
    return label;
  }

  getLabelsToPurge(regex) {
    return this.userLabels.filter((label) => {
      return regex.test(label.name);
    });
  }

  renameLabel(oldName, newName) {
    const label = this.getLabel(oldName);
    if (label) {
      const i = this.userLabels.indexOf(label);
      label.name = newName;
      Gmail.Users.Labels.update(label, 'me', label.id);
      this.userLabels[i] = label;
    } else {
      Logger.log(`Rename failed.  Label not found: ${oldName}`);
    }
  }

  createLabel(labelName) {
    const label = Gmail.Users.Labels.create({ name: labelName }, 'me');
    this.userLabels.push(label);
    return label;
  }
}
