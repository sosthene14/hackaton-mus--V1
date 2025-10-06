"use client"

import { useRef, useEffect } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function FirstPersonControls() {
  const { camera, gl } = useThree()
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })
  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())
  const euler = useRef(new THREE.Euler(0, 0, 0, "YXZ"))
  const isDragging = useRef(false)
  const previousMousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
        case "ArrowUp":
          moveState.current.forward = true
          break
        case "KeyS":
        case "ArrowDown":
          moveState.current.backward = true
          break
        case "KeyA":
        case "ArrowLeft":
          moveState.current.left = true
          break
        case "KeyD":
        case "ArrowRight":
          moveState.current.right = true
          break
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
        case "ArrowUp":
          moveState.current.forward = false
          break
        case "KeyS":
        case "ArrowDown":
          moveState.current.backward = false
          break
        case "KeyA":
        case "ArrowLeft":
          moveState.current.left = false
          break
        case "KeyD":
        case "ArrowRight":
          moveState.current.right = false
          break
      }
    }

    const handleMouseDown = (event: MouseEvent) => {
      isDragging.current = true
      previousMousePosition.current = { x: event.clientX, y: event.clientY }
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging.current) return

      const deltaX = event.clientX - previousMousePosition.current.x
      const deltaY = event.clientY - previousMousePosition.current.y

      previousMousePosition.current = { x: event.clientX, y: event.clientY }

      euler.current.setFromQuaternion(camera.quaternion)
      euler.current.y -= deltaX * 0.002
      euler.current.x -= deltaY * 0.002
      euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x))
      camera.quaternion.setFromEuler(euler.current)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    gl.domElement.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
      gl.domElement.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [camera, gl])

  useFrame((_, delta) => {
    const speed = 8.0
    velocity.current.x -= velocity.current.x * 8.0 * delta
    velocity.current.z -= velocity.current.z * 8.0 * delta

    direction.current.z = Number(moveState.current.forward) - Number(moveState.current.backward)
    direction.current.x = Number(moveState.current.right) - Number(moveState.current.left)
    direction.current.normalize()

    if (moveState.current.forward || moveState.current.backward) {
      velocity.current.z -= direction.current.z * speed * delta
    }
    if (moveState.current.left || moveState.current.right) {
      velocity.current.x -= direction.current.x * speed * delta
    }

    // Apply movement relative to camera direction
    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward)
    forward.y = 0
    forward.normalize()

    const right = new THREE.Vector3()
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize()

    camera.position.addScaledVector(forward, -velocity.current.z * delta)
    camera.position.addScaledVector(right, -velocity.current.x * delta)

    // Keep camera at eye level
    camera.position.y = 1.6
  })

  return null
}
