import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create(data: { score: number }) {
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2 - 20, 'Игра окончена', { color: '#fff' }).setOrigin(0.5);
    this.add.text(width / 2, height / 2 + 10, `Очки: ${data.score ?? 0}`, { color: '#8fd3ff' }).setOrigin(0.5);

    this.input.keyboard?.once('keydown-ENTER', () => {
      this.scene.start('Menu');
    });
    this.input.once('pointerdown', () => {
      this.scene.start('Menu');
    });
  }
}
