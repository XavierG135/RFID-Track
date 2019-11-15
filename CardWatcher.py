import threading
import time
import sys

from smartcard.pcsc.PCSCCardConnection import translateprotocolheader
from smartcard.scard import SCardTransmit, SCardGetErrorMessage
from smartcard.System import readers
from smartcard.CardMonitoring import CardMonitor, CardObserver
from smartcard.util import toHexString
from smartcard.CardConnectionObserver import ConsoleCardConnectionObserver


class CardWatcher:
    def __init__(self, on_card):
        self.monitor = CardMonitor()
        self.observer = MyObserver(on_card)

    def start(self):
        available_reader = readers()

        if not available_reader:
            raise Exception('No smartcard readers detected')

        self.monitor.addObserver(self.observer)

        while True:
            time.sleep(1)

        self.monitor.deleteObserver(self.observer)


class MyObserver(CardObserver):
    def __init__(self, on_card):
        super().__init__()
        self.on_card = on_card

    def update(self, observable, actions):
        addedcards, removedcards = actions

        for card in addedcards:
            connection = card.createConnection()
            connection.connect()

            # This will log raw card traffic to console
            connection.addObserver(ConsoleCardConnectionObserver())
            comp = connection.component

            if not comp.hcard:
                raise Exception("Tried to transit to non-open connection: {}".format(comp))

            protocol = comp.getProtocol()
            pcscprotocolheader = translateprotocolheader(protocol)

            # http://pyscard.sourceforge.net/epydoc/smartcard.scard.scard-module.html#SCardTransmit
            msg = [0xff, 0xca, 0x00, 0x00, 0x04]
            
            hresult, response = SCardTransmit(comp.hcard, pcscprotocolheader, msg)

            if hresult != 0:
                raise Exception(
                    'Failed to transmit with protocol '
                    + str(pcscprotocolheader)
                    + '. '
                    + SCardGetErrorMessage(hresult)
                )

            resp_bytes = ['{0:02x}'.format(r) for r in response]
            status = ''.join(resp_bytes[-2:])

            if status != '9000':
                return
                # raise Exception('Could not read card.')

            serial = ''.join(resp_bytes[0:4])
            self.on_card(serial)
