#!/bin/bash
set -e

echo "> Applying K8s configs using Kustomize..."
kubectl apply -k K8s/

kubectl wait --for=condition=available deployment --all -n fx-trading --timeout=180s
kubectl get all -n fx-trading
kubectl logs -f deployment/api-gateway -n fx-trading