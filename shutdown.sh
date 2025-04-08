#!/bin/bash
set -e

echo "> Removing all K8s resources using Kustomize..."
kubectl delete -k K8s/