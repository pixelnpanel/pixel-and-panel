'use client'

import { useEffect } from 'react'

const FOCUSABLE = 'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])'

// Search dialogs share focus containment, background isolation and restoration.
export function useModalFocus(dialogRef, open, setOpen) {
    useEffect(() => {
        const dialog = dialogRef.current
        if (!open || !dialog) return
        const opener = document.activeElement
        const previousOverflow = document.body.style.overflow
        const background = []
        // Keep the overlay backdrop clickable; isolate everything outside it.
        let layer = dialog.parentElement
        while (layer && layer !== document.body) {
            for (const sibling of layer.parentElement?.children || []) {
                if (sibling !== layer) {
                    background.push([sibling, sibling.inert])
                    sibling.setAttribute('inert', '')
                }
            }
            layer = layer.parentElement
        }
        document.body.style.overflow = 'hidden'
        const controls = () => [...dialog.querySelectorAll(FOCUSABLE)]
            .filter((node) => !node.disabled && node.tabIndex >= 0 && node.getClientRects().length > 0)
        const focusFirst = () => (dialog.querySelector('input') || controls()[0] || dialog).focus()
        focusFirst()

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                setOpen(false)
            }
            if (event.key !== 'Tab') return
            const items = controls()
            const first = items[0]
            const last = items.at(-1)
            if (!first) { event.preventDefault(); dialog.focus(); return }
            if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
                event.preventDefault()
                last.focus()
            } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
                event.preventDefault()
                first.focus()
            }
        }
        const onFocus = (event) => { if (!dialog.contains(event.target)) focusFirst() }
        document.addEventListener('keydown', onKeyDown)
        document.addEventListener('focusin', onFocus)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.removeEventListener('focusin', onFocus)
            background.forEach(([node, inert]) => { if (inert) node.setAttribute('inert', ''); else node.removeAttribute('inert') })
            document.body.style.overflow = previousOverflow
            if (opener?.isConnected) opener.focus({ preventScroll: true })
        }
    }, [dialogRef, open, setOpen])
}
