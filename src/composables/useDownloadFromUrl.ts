export function downloadFromUrl(
    url: string,
    name: string,
    options?: { openInNew?: boolean }
) {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;

    if (options?.openInNew) link.target = "_blank";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove();
}
