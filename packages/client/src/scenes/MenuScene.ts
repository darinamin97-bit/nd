import Phaser from 'phaser';

type Faction = 'JACOBITE' | 'ENGLISH';

export class MenuScene extends Phaser.Scene {
  private selected: Faction = 'JACOBITE';

  constructor() {
    super('Menu');
  }

  create() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2 - 60, 'Выбор фракции', { color: '#fff' }).setOrigin(0.5);

    const options: Faction[] = ['JACOBITE', 'ENGLISH'];
    options.forEach((f, idx) => {
      const y = height / 2 + idx * 30;
      const txt = this.add.text(width / 2, y, f, { color: '#8fd3ff' }).setOrigin(0.5);
      txt.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          this.selected = f;
          this.startGame();
        });
    });

    this.input.keyboard?.on('keydown-ENTER', () => this.startGame());
  }

  private startGame() {
    this.scene.start('Game', { faction: this.selected });
  }
}
