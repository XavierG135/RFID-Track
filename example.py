from CardWatcher import CardWatcher


def on_card(serial):
    print(serial)


c = CardWatcher(on_card)
c.start()
