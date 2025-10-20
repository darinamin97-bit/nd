import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    // Preload minimal assets here if needed
  }

  create() {
    this.scene.start('Menu');
  }
}
